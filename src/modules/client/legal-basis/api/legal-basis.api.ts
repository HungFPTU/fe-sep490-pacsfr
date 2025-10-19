import { API_PATH } from "@/core/config";
import { http } from "@core/http/client";
import type { LegalBasisDetailResponse, LegalBasisListResponse } from "../types";

export class LegalBasisApi {

    // Get legal basis by ID
    static async getLegalBasisById(id: string): Promise<LegalBasisDetailResponse> {
        const response = await http.get<LegalBasisDetailResponse>(API_PATH.CLIENT.LEGAL_BASIS.BY_ID(id));

        return response.data;
    }

    // Get all legal basis
    static async getLegalBasis(): Promise<LegalBasisListResponse> {
        const response = await http.get<LegalBasisListResponse>(API_PATH.CLIENT.LEGAL_BASIS.ALL);
        return response.data;
    }
}
