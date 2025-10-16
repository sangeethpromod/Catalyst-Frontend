import Dropdown from "@/components/ui/dropdown";
import InputField from "@/components/ui/inputfield";
import Button from "../ui/button";
import React, { useState } from "react";
import { analyzeMutualFund } from "@/Service/mf-agent.service";
import { HeatmapChart } from "@/components/Charts/HeatmapChart";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
function workspaceUX() {
  const [selected, setSelected] = useState("");
  const options = [
    { label: "Select an option", value: "" },
    { label: "Bill Akman", value: "ackman" },
    { label: "Warren Buffet", value: "buffet" },
  ];
  const [fundId, setFundId] = useState("");
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleRunAgent = async () => {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      if (!fundId) {
        setError("FundID is required");
        setLoading(false);
        return;
      }
      const req = {
        agentName: selected,
        schemeCode: Number(fundId),
        period,
      };
      const res = await analyzeMutualFund(req);
      console.log('Full API Response:', res);
      console.log('Heatmap data:', res?.metrics?.graphs?.heatmap?.data);
      setResult(res);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-ful overflow-hidden flex flex-col items-center">
      <div className="w-[95%] h-full mt-5">
        <h1 className="text-2xl font-normal mt-5 text-white">
          Mutual Fund Agentic Workspace
        </h1>
      </div>
      <div className="w-[95%] h-full p-3 border rounded mt-3 border-stone-800">
        <h1 className="text-xl font-normal text-white mb-2">Fund and Agent</h1>
        <div className="h-[2px] bg-stone-800 mb-4"></div>
        <div className="flex gap-4 mt-4 w-full">

          <InputField
            value={fundId}
            onChange={setFundId}
            width="100%"
            label="FundID"
            placeholder="Enter Fund ID"
          />
          <InputField
            value={period}
            onChange={setPeriod}
            width="100%"
            label="Period"
            placeholder="Enter Period"
          />
            <Dropdown
            options={options}
            value={selected}
            onChange={setSelected}
            width="100%"
            className=""
            label="Choose Agent"
          />
        </div>
        <Button className="mt-4" width="full" onClick={handleRunAgent} disabled={loading}>
          {loading ? "Running..." : "Run Agent"}
        </Button>
      </div>
      <div className="w-[95%] min-h-[70vh] p-3 mb-10 border rounded mt-3 border-stone-800">
        {error && <div className="text-red-400 mb-2">{error}</div>}
        
        {result && (
          <div className="space-y-6">
            {/* Fund Basic Information */}
            {result.metrics && (
              <div className="border border-stone-900 p-4 rounded bg-gradient-to-r from-orange-500/3 to-red-700/8">
                <h2 className="text-xl font-semibold text-white mb-4">Fund Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-stone-400 text-sm">Fund Name</p>
                    <p className="text-white font-medium">{result.metrics.fundName}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Fund House</p>
                    <p className="text-white font-medium">{result.metrics.fundHouse}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Category</p>
                    <p className="text-white font-medium">{result.metrics.category}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Current NAV</p>
                    <p className="text-white font-medium">₹{result.metrics.currentNav}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Fund Age</p>
                    <p className="text-white font-medium">{result.metrics.riskMetrics?.fundAge}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Volatility</p>
                    <p className="text-white font-medium">{result.metrics.riskMetrics?.volatility}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Returns Section */}
            {result.metrics?.returns && (
              <div className="border border-stone-900 p-4 rounded ">
                <h2 className="text-xl font-semibold text-white mb-4">Returns Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(result.metrics.returns).map(([period, data]: [string, any]) => (
                    <div key={period} className="border border-stone-900 p-4 rounded bg-gradient-to-r from-orange-500/3 to-red-700/15">
                      <p className="text-stone-400 text-sm capitalize">{period.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-white font-semibold text-lg">{data.cagr}%</p>
                      <p className="text-stone-400 text-xs">CAGR ({data.years} year{data.years > 1 ? 's' : ''})</p>
                      <p className="text-stone-400 text-xs">Absolute: {data.absoluteReturn}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk vs Reward Chart */}
            {result.metrics?.graphs?.riskReward && (
              <div className="border border-stone-900 p-4 rounded ">
                <h2 className="text-xl font-semibold text-white mb-4">{result.metrics.graphs.riskReward.label}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.metrics.graphs.riskReward.data.map((item: any, index: number) => (
                    <div key={index} className="bg-stone-800 p-3 rounded">
                      <p className="text-stone-400 text-sm">{item.period}</p>
                      <p className="text-white font-semibold">Risk: {item.risk}%</p>
                      <p className="text-white">Reward: {item.reward}%</p>
                      <p className="text-stone-400 text-xs">Ratio: {item.ratio.toFixed(3)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monthly Returns Treemap */}
            {result.metrics?.graphs?.heatmap && (
              <div className="border border-stone-900 p-4 rounded ">
                <h2 className="text-xl font-semibold text-white mb-4">Monthly Returns Visualization</h2>
                <HeatmapChart data={result.metrics.graphs.heatmap.data} label={result.metrics.graphs.heatmap.label} />
              </div>
            )}

            {/* Analysis Section */}
            {result.analysis && (
              <div className="border border-stone-900 p-4 rounded ">
                <h2 className="text-xl font-semibold text-white mb-4">Detailed Analysis</h2>
                <div className="max-h-[600px] overflow-y-auto pr-2">
                  {result.markdown ? (
                    <MarkdownRenderer content={result.markdown} />
                  ) : (
                    <div className="text-stone-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {result.analysis}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fund Metadata */}
            {result.data?.meta && (
              <div className="border border-stone-900 p-4 rounded ">
                <h2 className="text-xl font-semibold text-white mb-4">Fund Metadata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-stone-400 text-sm">Scheme Code</p>
                    <p className="text-white font-medium">{result.data.meta.scheme_code}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Scheme Type</p>
                    <p className="text-white font-medium">{result.data.meta.scheme_type}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">ISIN Growth</p>
                    <p className="text-white font-medium font-mono text-xs">{result.data.meta.isin_growth}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">ISIN Dividend</p>
                    <p className="text-white font-medium font-mono text-xs">{result.data.meta.isin_div_reinvestment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default workspaceUX;
