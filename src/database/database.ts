// import * as path from 'path';
import Database from 'better-sqlite3';
import { FindToTable, GetAllDataTable } from './interfaces';
import * as fs from 'fs';
export default class DatabaseUtils {
  constructor(databaseAddress?: string, databaseName?: string) {
    DatabaseUtils.databaseAddress =
      databaseAddress || __dirname + '/database.sqlite';
    DatabaseUtils.databaseTable = databaseName || 'names';
  }

  public static databaseAddress: string = __dirname + '/database.sqlite';
  public static databaseTable: string = 'names';

  private static db = new Database(DatabaseUtils.databaseAddress);

  public static checkIsDbFile(database: string) {
    const exists = fs.existsSync(database);
    if (!exists) throw new Error('Database File Not Found');
    return;
  }

  public static findItemToTable(options: FindToTable) {
    const SELECT = options.select || '*';
    const TABLE = options.table || DatabaseUtils.databaseTable;
    const WHERE_COLUMN = options.whereColumn;
    const WHERE_TYPE = options.whereType;
    const VALUES = WHERE_TYPE == 'LIKE' ? `%${options.value}%` : options.value;

    const data = DatabaseUtils.db
      .prepare(
        `SELECT ${SELECT} FROM ${TABLE} WHERE ${WHERE_COLUMN} ${WHERE_TYPE} ?`
      )
      .get(VALUES);
    return data;
  }

  public static getAllDataInTable(options: GetAllDataTable): Array<object> {
    const data = this.db
      .prepare(`SELECT ${options.select} FROM ${options.table}`)
      .all();
    return data;
  }
}
