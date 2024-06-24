import { Component } from '@angular/core';

@Component({
  selector: 'app-performances-table',
  templateUrl: './performances-table.component.html',
  styleUrls: ['./performances-table.component.css']
})
export class PerformancesTableComponent {
  performances = new Map<string, {dateTimeBegin: string, sport: string, sex: string, mark: string, medals: string}>();
  selectedPerformances = new Map<string, {dateTimeBegin: string, sport: string, sex: string, mark: string, medals: string}>();
  remainingTime: number = 180;
  intervalId: any;

    ngOnInit(): void {
      this.performances.set('Thomas Fannon', {
        dateTimeBegin: '2021-08-01T00:10:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '48.45',
        medals: 'Gold'
      });
      this.performances.set('Pawel Juraszek', {
        dateTimeBegin: '2021-08-01T00:17:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '50.45',
        medals: 'Bronze'
      });
      this.performances.set('Benjamin Proud', {
        dateTimeBegin: '2021-08-01T00:30:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '52.45',
        medals: 'Bronze'
      });
      this.performances.set('Filipe Gomes', {
        dateTimeBegin: '2021-08-01T00:37:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '54.45',
        medals: 'Bronze'
      });
      this.performances.set('Dylan Carter', {
        dateTimeBegin: '2021-08-01T13:58:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '54.95',
        medals: 'Bronze'
      });
      this.performances.set('Damien Shamambo', {
        dateTimeBegin: '2021-08-01T14:10:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '58.15',
        medals: 'Bronze'
      });
      this.performances.set('Camil Doua', {
        dateTimeBegin: '2021-08-01T14:14:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '59.35',
        medals: 'Bronze'
      });
      this.performances.set('Terence Tengue', {
        dateTimeBegin: '2021-08-01T14:16:00Z',
        sport: 'Qualification - Heat 11,50m nage libre',
        sex: 'Homme',
        mark: '54.25',
        medals: 'Bronze'
      });
      this.performances.set('Adi Mesetovic', {
        dateTimeBegin: '2021-08-01T14:50:00Z',
        sport: 'Qualification - Heat 10,50m nage libre',
        sex: 'Homme',
        mark: '49.55',
        medals: 'Gold'
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
      const performanceTime = new Date(value.dateTimeBegin);
      const diffInMinutes = Math.abs(currentTime.getTime() - performanceTime.getTime()) / (1000 * 60);
      if (diffInMinutes % 8 === 0) {
        console.log(`Performance of ${key}: ${value.mark}`)
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
