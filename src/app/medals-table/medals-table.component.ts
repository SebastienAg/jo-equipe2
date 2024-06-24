import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medals-table',
  templateUrl: './medals-table.component.html',
  styleUrls: ['./medals-table.component.css']
})
export class MedalsTableComponent implements OnInit {
  medals = new Map<string, {gold: number, silver: number, bronze: number}>();
  remainingTime: number = 180;
  intervalId: any;

  ngOnInit(): void {
    this.medals.set('USA', {gold: 39, silver: 41, bronze: 33});
    this.medals.set('China', {gold: 38, silver: 32, bronze: 18});
    // add more countries...
  }

  startCountdown(seconds: number) {
    this.remainingTime = seconds;

    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
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