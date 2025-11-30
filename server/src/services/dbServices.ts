import { DBServicesInterface } from '../types/dbServicesInterface';
import { join } from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
export class DBServices implements DBServicesInterface {
  private dbFolderPath: string;

  constructor() {
    this.dbFolderPath = join(__dirname, '../db');
  }

  async openDB(dbFileName: string) {
    try {
      return open({
        filename: join(this.dbFolderPath, dbFileName),
        driver: sqlite3.Database,
      });
    } catch (error) {
      console.error(`dbServices::openDB::error ${error}`);
      throw new Error(`${error}`);
    }
  }

  async queryDB(dbFileName: string, query: string) {
    try {
      const db = await this.openDB(dbFileName);
      return db.all(query);
    } catch (error) {
      console.error(`dbServices::queryDB::error ${error}`);
      throw new Error(`${error}`);
    }
  }
}
