import Dropdown from "@/components/ui/dropdown";
import InputField from "@/components/ui/inputfield";
import Button from "../ui/button";
import React, { useState } from "react";
import { analyzeMutualFund } from "@/Service/mf-agent.service";
import { HeatmapChart } from "@/components/Charts/HeatmapChart";
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
        {result?.metrics?.graphs?.heatmap && (
          <HeatmapChart data={result.metrics.graphs.heatmap.data} label={result.metrics.graphs.heatmap.label} />
        )}
        {/* Add more chart types here as needed */}
      </div>
    </div>
  );
}

export default workspaceUX;
