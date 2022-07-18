export interface FindToTable {
  table: string;
  whereColumn: string;
  whereType: '=' | 'IN' | 'LIKE';
  select: string[] | '*';
  value: string;
}

export interface GetAllDataTable {
  table: string;
  select: string[] | '*';
}

export interface InsertDataTable {}

export interface OptionsDatabase {
  db_address?: string;
  db_name?: string;
  verbose?: boolean;
}
