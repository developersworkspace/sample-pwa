import idb, { UpgradeDB, ObjectStore, Transaction, DB } from 'idb';

export class Repository {
  public async insert(obj: { amount: number; date: number }): Promise<void> {
    const objectStore: ObjectStore<any, any> = await this.getObjectStore();

    objectStore.add(obj);
  }

  public async list(startDate: Date, endDate: Date): Promise<Array<{ amount: number; date: number }>> {
    const objectStore: ObjectStore<any, any> = await this.getObjectStore();

    const expenses: Array<{ amount: number; date: number }> = await objectStore.getAll();

    return expenses
      .filter((expense) => expense.date >= startDate.getTime() && expense.date <= endDate.getTime())
      .sort((a: { amount: number; date: number }, b: { amount: number; date: number }) => {
        return a.date - b.date;
      });
  }

  protected async getObjectStore(): Promise<ObjectStore<any, any>> {
    const database: DB = await idb.open('daily-expenses-tracker', 1, (upgradeDB: UpgradeDB) => {
      upgradeDB.createObjectStore('expenses', { autoIncrement: true, keyPath: 'id' });
    });

    const transaction: Transaction = database.transaction('expenses', 'readwrite');

    const objectStore: ObjectStore<any, any> = transaction.objectStore('expenses');

    return objectStore;
  }
}
