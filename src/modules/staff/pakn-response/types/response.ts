export interface PaknResponseAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
}

export interface PaknResponse {
  id: string;
  paknId: string;
  paknCode?: string;
  responseContent: string;
  staffId?: string;
  staffName?: string;
  createdAt: string | Date;
  attachments?: {
    $values: PaknResponseAttachment[];
  };
}

