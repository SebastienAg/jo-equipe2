import { Component } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-performances-table',
  templateUrl: './performances-table.component.html',
  styleUrls: ['./performances-table.component.css']
})
export class PerformancesTableComponent {
  performances = new Map<string, {rank: number, recordTime: string, hour: string, sport: string}>();
  selectedPerformances = new Map<string, {rank: number, recordTime: string, hour: string, sport: string}>();

  remainingTime: number = 180;
  intervalId: any;

  constructor() {
    this.getAthleteRecords('assets/Athle_D1.csv').then((athleteRecords) => {
      this.performances = athleteRecords;
    });
  }

  getAthleteRecords(filePath: string): Promise<Map<string, {rank: number, recordTime: string, hour: string, sport: string}>> {
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => {
          let athleteRecords = new Map<string, {rank: number, recordTime: string, hour: string, sport: string}>();

          for (let row of results.data) {
            // @ts-ignore
            let athleteName = row['NAME'];
            // @ts-ignore
            let rank = row['PLACE'];
            //  @ts-ignore
            let recordTime = row['MARK'];
            //  @ts-ignore
            let hour = row['HOUR'];
            //  @ts-ignore
            let sport = row['SPORT'];

            if (athleteName && rank && recordTime) {
              athleteRecords.set(athleteName, {rank: rank, recordTime: recordTime, hour: hour, sport: sport});
            }
          }
          resolve(athleteRecords);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  startCountdown(seconds: number) {
    this.remainingTime = seconds;

    this.intervalId = setInterval(() => {
      this.remainingTime--;
      this.displayPerformanceData();
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  displayPerformanceData() {
    const currentTime = new Date();
    this.performances.forEach((value, key) => {
      this.selectedPerformances.set(key, value);
      const performanceTime = new Date(value.hour);
      const diffInMinutes = Math.abs(currentTime.getTime() - performanceTime.getTime()) / (1000 * 60);
      if (diffInMinutes % 8 === 0) {
        console.log(`Performance of ${key}: ${value.rank}`)
      }
    });
  }

  public start(): void {
    this.startCountdown(3 * 60);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
