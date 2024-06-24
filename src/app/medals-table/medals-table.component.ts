import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medals-table',
  templateUrl: './medals-table.component.html',
  styleUrls: ['./medals-table.component.css']
})
export class MedalsTableComponent implements OnInit {
  medals = [
    { country: 'USA', gold: 39, silver: 41, bronze: 33 },
    { country: 'China', gold: 38, silver: 32, bronze: 18 },
    // add more countries...
  ];

  constructor() { }

  ngOnInit(): void {
  }
}