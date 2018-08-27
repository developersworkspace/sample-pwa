import { Repository } from './repository';

export class Service {
  protected repository: Repository = new Repository();

  protected total = 3200;

  public addExpense(date: Date, amount: number): void {
    this.repository.insert({
      amount,
      date: date.getTime(),
    });
  }

  public calculateDailyExpensesLimit(): number {
    const totalSpent: number = this.calculateTotalSpent();

    const remaining: number = this.total - totalSpent;
    const dailyLimit: number = remaining / this.getNumberOfDaysRemaining();

    return dailyLimit;
  }

  public calculateDailyExpensesLimitAdvanced(): number {
    const totalSpent: number = this.calculateTotalSpent();

    const remaining: number = this.total - totalSpent;

    const startDate: Date = this.getStartDate();
    const endDate: Date = this.getEndDate();

    const totalNumberOfDays: number = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;

    const initialDailyLimit: number = remaining / totalNumberOfDays;

    const dailyLimit: number = this.getNumberOfDaysPast() * initialDailyLimit - totalSpent;

    return dailyLimit;
  }

  public getExpenses(): Array<{ amount: number; date: number }> {
    const expenses: Array<{ amount: number; date: number }> = this.repository.list(
      this.getStartDate(),
      this.getEndDate(),
    );

    const expensesByDate: Array<{ amount: number; date: number }> = [];

    for (const expense of expenses) {
      const existingExpenseByDate: { amount: number; date: number } = expensesByDate.find((x) => x.date === expense.date);

      if (existingExpenseByDate) {
        existingExpenseByDate.amount += expense.amount;
      } else {
        expensesByDate.push(expense);
      }
    }

    return expensesByDate;
  }

  protected calculateTotalSpent(): number {
    const expenses: Array<{ amount: number; date: number }> = this.repository.list(
      this.getStartDate(),
      this.getEndDate(),
    );

    let sum = 0;

    for (const expense of expenses) {
      sum += expense.amount;
    }

    return sum;
  }

  protected getEndDate(): Date {
    const currentDay: number = new Date().getDate();

    if (currentDay >= 25) {
      const date: Date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setDate(25);
      date.setMonth(date.getMonth() + 1);

      return date;
    }

    if (currentDay < 25) {
      const date: Date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setDate(25);

      return date;
    }
  }

  protected getNumberOfDaysPast(): number {
    const startDate: Date = this.getStartDate();
    const currentDate: Date = new Date();

    return (currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;
  }

  protected getNumberOfDaysRemaining(): number {
    const endDate: Date = this.getEndDate();
    const currentDate: Date = new Date();

    return (endDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24;
  }

  protected getStartDate(): Date {
    const currentDay: number = new Date().getDate();

    if (currentDay >= 25) {
      const date: Date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setDate(25);

      return date;
    }

    if (currentDay < 25) {
      const date: Date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setDate(25);
      date.setMonth(date.getMonth() - 1);

      return date;
    }
  }
}
