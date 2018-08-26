export class Repository {
  public insert(obj: { amount: number; date: number }): void {
    const json: string = localStorage.getItem('expenses');

    const expenses: Array<{ amount: number; date: number }> = json ? JSON.parse(json) : [];

    expenses.push(obj);

    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  public list(startDate: Date, endDate: Date): Array<{ amount: number; date: number }> {
    const json: string = localStorage.getItem('expenses');

    const expenses: Array<{ amount: number; date: number }> = json ? JSON.parse(json) : [];

    return expenses.filter((expense) => expense.date >= startDate.getTime() && expense.date <= endDate.getTime());
  }
}
