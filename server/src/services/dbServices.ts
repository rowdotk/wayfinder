import { DBServicesInterface } from '../types/dbServicesInterface';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
export class DBServices implements DBServicesInterface {
  private dbFolderPath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    this.dbFolderPath = join(__dirname, '../db');
  }

  async openDB(dbFileName: string) {
    return open({
      filename: join(this.dbFolderPath, dbFileName),
      driver: sqlite3.Database,
    });
  }
}
