"use client";

import { useQuery } from "@tanstack/react-query";
import { LegalBasisService } from "../services/legal-basis.service";

// Query keys
export const legalBasisKeys = {
    LEGAL_BASIS: ["legalBasis"] as const,
    LEGAL_BASIS_DETAILS: () => [...legalBasisKeys.LEGAL_BASIS, "detail"] as const,
    LEGAL_BASIS_DETAIL: (id: string) => [...legalBasisKeys.LEGAL_BASIS_DETAILS(), id] as const,
} as const;

// Hook for getting legal basis by ID
export const useLegalBasis = (id: string) => {
    return useQuery({
        queryKey: legalBasisKeys.LEGAL_BASIS_DETAIL(id),
        queryFn: () => LegalBasisService.getLegalBasisById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook for getting all legal basis
export const useLegalBasisList = () => {
    return useQuery({
        queryKey: legalBasisKeys.LEGAL_BASIS,
        queryFn: LegalBasisService.getLegalBasis,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
};
