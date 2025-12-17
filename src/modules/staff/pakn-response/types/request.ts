export interface CreatePaknResponseRequest {
  paknId: string;
  responseContent: string;
  attachments?: File[];
}

export interface PaknResponseFilters {
  paknId: string;
  page: number;
  size: number;
}

