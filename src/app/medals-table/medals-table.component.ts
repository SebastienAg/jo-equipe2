import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medals-table',
  templateUrl: './medals-table.component.html',
  styleUrls: ['./medals-table.component.css']
})
export class MedalsTableComponent implements OnInit {
  medals = new Map<string, {gold: number, silver: number, bronze: number}>();


  ngOnInit(): void {
    this.medals.set('USA', {gold: 39, silver: 41, bronze: 33});
    this.medals.set('China', {gold: 38, silver: 32, bronze: 18});
    // add more countries...
  }
}