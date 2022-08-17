export interface FindToTable {
  table: string;
  whereColumn: string;
  whereType: '=' | 'IN' | 'LIKE';
  select: string[] | '*';
  value: string;
}

export interface Limitation {
  limit?: {
    limit?: number;
    offset?: number;
  };
}
export interface GetAllDataTable {
  table: string;
  select: string[] | '*';
}

export interface GetDataTablePaging extends Limitation {
  table: string;
  select: string[] | '*';
}

export interface InsertDataTable {}

export interface OptionsDatabase {
  db_address?: string;
  db_name?: string;
  verbose?: boolean;
}
