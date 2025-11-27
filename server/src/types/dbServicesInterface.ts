import { Database } from 'sqlite';

export interface DBServicesInterface {
  openDB: (dbFileName: string) => Promise<Database>;
}
