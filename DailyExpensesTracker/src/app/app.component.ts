import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public chart = null;

  public dailyExpensesLimit = 0;

  public dailyExpensesLimitAdvanced = 0;

  public inputAmount: number = null;

  public inputDate: string = null;

  protected service: Service = new Service();

  constructor() {}

  public async ngOnInit(): Promise<void> {
    this.dailyExpensesLimit = await this.service.calculateDailyExpensesLimit();
    this.dailyExpensesLimitAdvanced = await this.service.calculateDailyExpensesLimitAdvanced();
    this.updateChart();
  }

  public async onClickSubmit(): Promise<void> {
    if (!this.inputAmount || !this.inputDate) {
      return;
    }

    this.service.addExpense(new Date(this.inputDate), this.inputAmount);

    this.inputAmount = null;
    this.inputDate = null;

    this.dailyExpensesLimit = await this.service.calculateDailyExpensesLimit();
    this.dailyExpensesLimitAdvanced = await this.service.calculateDailyExpensesLimitAdvanced();
    this.updateChart();
  }

  protected async updateChart(): Promise<void> {
    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: undefined,
      },
      series: [
        {
          data: (await this.service.getExpenses()).map((expense) => {
            return {
              x: expense.date,
              y: expense.amount,
            };
          }),
          name: 'Daily Expenses',
        },
      ],
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Amount',
        },
      },
    });
  }
}
