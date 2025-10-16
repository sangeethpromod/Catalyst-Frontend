import axiosInstance from "@/lib/axios";
import { ANALYZE_MUTUAL_FUND_ENDPOINT } from "@/api/api-endpoint";

export interface AnalyzeMutualFundRequest {
	agentName: string;
	schemeCode: number;
	period: string;
}

export async function analyzeMutualFund(req: AnalyzeMutualFundRequest) {
	const response = await axiosInstance.post(ANALYZE_MUTUAL_FUND_ENDPOINT, req);
	return response.data;
}
