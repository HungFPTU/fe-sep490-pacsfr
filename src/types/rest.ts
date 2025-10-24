/* eslint-disable @typescript-eslint/no-unused-vars */
export type RestResponse<T extends object> = RestMany<T> | RestOne<T>;

export interface RestMany<T extends object> {
  $id?: string;
  success: boolean;
  data: { $id?: string; $values: (T & { $id?: string })[] };
}
export interface RestOne<T extends object> {
  $id?: string;
  success: boolean;
  data: (T & { $id?: string });
}

const isMany = <T extends object>(r: RestResponse<T>): r is RestMany<T> =>
  !!(r as RestMany<T>)?.data && Array.isArray((r as RestMany<T>).data.$values);

type DollarMeta = { $id?: unknown; $ref?: unknown };

export const stripDollarMeta = <T extends object>(o: T): T => {
  const { $id: _drop1, $ref: _drop2, ...rest } = (o ?? {}) as T & DollarMeta;
  return rest as T;
};

export const getValues = <T extends object>(r: RestResponse<T>): T[] => {
  if (!r?.success || !r.data) return [];
  return isMany(r)
    ? (r.data.$values ?? [])?.map((it) => stripDollarMeta<T>(it))
    : [stripDollarMeta<T>(r.data as T & { $id?: string })];
};

export const getOne = <T extends object>(r: RestResponse<T>): T | null =>
  !r?.success || !r.data ? null :
  isMany(r) ? null : stripDollarMeta<T>(r.data as T & { $id?: string });

// ================== Paged ==================
export interface RestPaged<T extends object> {
  $id?: string;
  success: boolean;
  message?: string;
  data?: {
    $id?: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;

    items:
      | { $id?: string; $values?: (T & { $id?: string })[] }
      | (T & { $id?: string })[];

    $values?: (T & { $id?: string })[];
  };
  timestamp?: string;
}

export interface PageResult<T extends object> {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  message?: string;
}

type WithMeta<T extends object> = T & { $id?: string; $ref?: string };

export const getValuesPage = <T extends object>(res: RestPaged<T>): PageResult<T> => {
  const d = res?.data;

  const meta = {
    page: d?.page ?? 1,
    size: d?.size ?? 0,
    total: d?.total ?? 0,
    totalPages: d?.totalPages ?? 0,
    hasPreviousPage: d?.hasPreviousPage ?? false,
    hasNextPage: d?.hasNextPage ?? false,
  };

  let rawItems: Array<WithMeta<T>> = [];

  if (Array.isArray(d?.items)) {
    rawItems = d!.items as Array<WithMeta<T>>;
  } else if (d?.items && Array.isArray((d.items as { $values?: unknown[] }).$values)) {
    rawItems = (d.items as { $values: Array<WithMeta<T>> }).$values;
  } else if (Array.isArray(d?.$values)) {
    rawItems = d.$values as Array<WithMeta<T>>;
  }

  const items = rawItems.map((it) => stripDollarMeta<T>(it));

  return { items, ...meta, message: res?.message };
};
