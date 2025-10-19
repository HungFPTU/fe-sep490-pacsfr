import { LegalBasisApi } from "../api/legal-basis.api";
import type { LegalBasis, LegalBasisDetailResponse, LegalBasisListResponse } from "../types";

export class LegalBasisService {
    // Get legal basis by ID
    static async getLegalBasisById(id: string): Promise<LegalBasisDetailResponse> {
        try {
            return await LegalBasisApi.getLegalBasisById(id);
        } catch (error) {
            console.error("Error fetching legal basis detail:", error);
            throw error;
        }
    }

    // Get all legal basis
    static async getLegalBasis(): Promise<LegalBasisListResponse> {
        try {
            return await LegalBasisApi.getLegalBasis();
        } catch (error) {
            console.error("Error fetching legal basis:", error);
            throw error;
        }
    }

    // Format legal basis name for display
    static formatLegalBasisName(legalBasis: LegalBasis): string {
        return legalBasis.name;
    }

    // Check if legal basis is active
    static isLegalBasisActive(legalBasis: LegalBasis): boolean {
        return legalBasis.isActive;
    }

    // Truncate content for preview
    static truncateContent(content: string, maxLength: number = 100): string {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    }
}
