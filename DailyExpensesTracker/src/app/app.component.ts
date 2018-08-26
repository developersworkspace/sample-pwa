import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Repository } from './repository';
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

  public ngOnInit(): void {
    this.dailyExpensesLimit = this.service.calculateDailyExpensesLimit();
    this.dailyExpensesLimitAdvanced = this.service.calculateDailyExpensesLimitAdvanced();
  }

  public onClickSubmit(): void {
    this.service.addExpense(new Date(this.inputDate), this.inputAmount);

    this.inputAmount = null;
    this.inputDate = null;

    this.dailyExpensesLimit = this.service.calculateDailyExpensesLimit();
    this.dailyExpensesLimitAdvanced = this.service.calculateDailyExpensesLimitAdvanced();
  }

  protected updateChart(): void {
    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: undefined,
      },
      series: [
        {
          data: [
            {
              x: new Date().getTime(),
              y: 10,
            },
          ],
          name: 'aaa',
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
