
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  providers: [DatePipe],
})
export class ProgressComponent implements OnInit {
  progress: any[] = [];
  fluency: any[] = [];
  dates: any[] = [];
  fluencyDate: any[] = [];
  fluencyScore: any[] = [];
  scores: any[] = [];
  linechart: Chart | undefined;
  barchart: Chart | undefined;
  proficiencyLevels: any[] = [];

  constructor(private _http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this._http.get<any[]>(`${environment.apiUrl}/user/loadProgress`).subscribe(
      (data) => {
        this.progress = data;
        this.fetchGraohData(this.progress);
    
      },
      (err) => {
        console.log(err);
      }
    );

    this._http.get<any[]>(`${environment.apiUrl}/user/loadFluency`).subscribe(
      (data) => {
        console.log(data);
        this.fluency = data;
        this.createBarChart(this.fluency);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchGraohData(progress: any[]): void {
    this.dates = progress.map((item) =>
      this.datePipe.transform(item.createdAt)
    );
    this.scores = progress.map((item) => item.score);
    console.log('Scores:', this.scores);
    this.proficiencyLevels = progress.map((item) => item.proficiencyLevel);
    console.log('Dates:', this.dates);

    const darkModeTheme = {
      chart: {
        backgroundColor: '#2b2b2b',
        style: { fontFamily: "'Unica One', sans-serif" },
        plotBorderColor: '#606063',
      },
      title: {
        style: {
          color: '#FFFFFF',
          textTransform: 'uppercase',
          fontSize: '20px',
        },
      },
      xAxis: {
        gridLineColor: '#707073',
        labels: { style: { color: '#FFFFFF' } },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: { style: { color: '#FFFFFF' } },
      },
      yAxis: {
        gridLineColor: '#707073',
        labels: { style: { color: '#FFFFFF' } },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: { style: { color: '#FFFFFF' } },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: { color: '#FFFFFF' },
        formatter: function (): string {
          return `<b>Date:</b> ${(<any>this).x}<br/><b>Score:</b> ${
            (<any>this).y
          }<br/><b>Proficiency Level:</b> ${
            (<any>this).point.proficiencyLevel
          }`;
        },
      },
      plotOptions: {
        series: {
          dataLabels: { color: '#FFFFFF' },
          marker: { lineColor: '#333' },
        },
        boxplot: { fillColor: '#505053' },
        candlestick: { lineColor: 'white' },
        errorbar: { color: 'white' },
      },
      legend: {
        itemStyle: { color: '#FFFFFF' },
        itemHoverStyle: { color: '#FFF' },
        itemHiddenStyle: { color: '#606063' },
      },
      credits: { style: { color: '#FFFFFF' } },
      labels: { style: { color: '#FFFFFF' } },
      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: { fill: '#505053' },
        },
      },
      rangeSelector: {
        buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: { color: '#CCC' },
          states: {
            hover: {
              fill: '#707073',
              stroke: '#000000',
              style: { color: 'white' },
            },
            select: {
              fill: '#000003',
              stroke: '#000000',
              style: { color: 'white' },
            },
          },
        },
        inputBoxBorderColor: '#505053',
        inputStyle: { backgroundColor: '#333', color: 'silver' },
        labelStyle: { color: 'silver' },
      },
      navigator: {
        handles: { backgroundColor: '#666', borderColor: '#AAA' },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: { color: '#7798BF', lineColor: '#A6C7ED' },
        xAxis: { gridLineColor: '#505053' },
      },
      scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043',
      },
    };

    this.linechart = new Chart({
      ...darkModeTheme,
      chart: {
        type: 'line',
        backgroundColor: '#111827',
      },
      title: {
        text: 'Communication Level Progress',
        style: {
          color: '#FFFFFF',
          textTransform: 'uppercase',
          fontSize: '20px',
        } as any,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: this.dates,
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
        lineColor: 'transparent', // Set the line color to null to hide the horizontal line
        gridLineWidth: 0, // Set grid line width to 0 to hide grid lines
        tickColor: '#707073', // Optional: Customize the tick color if needed
      },
      yAxis: {
        title: {
          text: 'Total Score',
          style: { color: '#FFFFFF' } as any,
        },
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
      },
      series: [
        {
          name: 'Proficiency Level',
          data: this.scores.map((score, index) => ({
            y: score,
            proficiencyLevel: this.proficiencyLevels[index], // Add this line
          })),
          color: 'yellow',
        } as any,
      ],
    });
  }

  createBarChart(fluency:any[]): void {

    this.fluencyDate =fluency.map((item) =>
      this.datePipe.transform(item.createdAt)
    );
    this.fluencyScore = fluency.map((item) => Number( item.analysis.fluency_score));
    console.log("fffffffffffffffffsssssssssss",this.fluencyScore);
   


    this.barchart = new Chart({
      chart: {
        type: 'bar',
        backgroundColor: '#111827',
      },
      title: {
        text: 'Fluency Levels',
        style: {
          color: '#FFFFFF',
          textTransform: 'uppercase',
          fontSize: '20px',
        } as any,
      },
      xAxis: {
        categories: this.fluencyDate,
        labels: { style: { color: '#FFFFFF' } },
        lineColor: 'transparent',
        gridLineWidth: 0,
        tickColor: '#707073',
      },
      yAxis: {
        title: { text: 'Fluency Level', style: { color: '#FFFFFF' } as any },
        labels: { style: { color: '#FFFFFF' } },
      },
      series: [
        {
          name: 'Fluency Level',
          data: this.fluencyScore,
          color: 'lightblue',
        } as any,
      ],
    });
  }
}
