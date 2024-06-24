import { Component } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-medals-table',
  templateUrl: './medals-table.component.html',
  styleUrls: ['./medals-table.component.css']
})
export class MedalsTableComponent {
  medals = new Map<string, {gold: number, silver: number, bronze: number}>();

  constructor() {
    Promise.all([
      this.getMedalsByCountry('assets/Athle_sample.csv'),
      this.getMedalsByCountry('assets/Nat_50m_sample.csv')
    ]).then(([res1, res2]) => {
      this.medals = new Map([...res1, ...res2]);
    }).catch((error) => {
      console.error(error);
    });
  }

  //This method acquires a csv file with the following columns: rank, athlete name, birthdate, country, mark, venue, event
  //and returns a list of medals by country.
  // Method to parse CSV file and return list of medals by country
  getMedalsByCountry(filePath: string): Promise<Map<string, {gold: number, silver: number, bronze: number}>> {
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results: { data: any; }) => {
          let medalsByCountry = new Map<string, {gold: number, silver: number, bronze: number}>();

          for (let row of results.data) {
            if(row !== '') {
              let country;

              // @ts-ignore

              if(row['NAT.'] && typeof row['NAT.'] === 'string') {
                // @ts-ignore
                if(row['NAT.'].length == 3){
                  // @ts-ignore
                  country = this.convertCountryToIsoCode(row['NAT.']);
                } else {
                  // @ts-ignore
                  country = row['NAT.'];
                }
              } else {
                // @ts-ignore
                console.error('Invalid value for NAT.: ', row['NAT.']);
              }

              // @ts-ignore
              let medalType = row['PLACE'];
              if (country && medalType && !medalsByCountry.has(country)) {
                medalsByCountry.set(country, {gold: 0, silver: 0, bronze: 0});
              }
              if (country && medalType) {
                this.getMedalType(medalType, medalsByCountry, country);
              }
            }
          }
          resolve(medalsByCountry);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  //implement a method that converts the name of a country to it's ISO code, like 'Brazil' to 'BRA'.
// Mapping of country names to ISO codes
  private countryToIsoCode = new Map<string, string>([
    ['ITA', 'Italie'],
    ['NED', 'Pays-Bas'],
    ['FIN', 'Finlande'],
    ['BRA', 'Brésil'],
    ['UKR', 'Ukraine'],
    ['GBR', 'Royaume-Uni'],
    ['ZIM', 'Zimbabwe'],
    ['CIV', 'Côte d\'Ivoire'],
    ['GRE', 'Grèce'],
    ['CAN', 'Canada'],
    ['USA', 'États-Unis'],
    ['SGP', 'Singapour'],
    ['POR', 'Portugal'],
    ['BOT', 'Botswana'],
    ['SWE', 'Suède'],
    ['QAT', 'Qatar'],
    ['NZL', 'Nouvelle-Zélande'],
    ['AUT', 'Autriche'],
    ['BUL', 'Bulgarie']
    // ... continue this list with all countries and their ISO codes
  ]);

  // Method to convert country name to ISO code
  convertCountryToIsoCode(countryName: string): string {
    return this.countryToIsoCode.get(countryName) || 'Unknown';
  }

  private getMedalType(medalType: string, medalsByCountry: Map<string, {
    gold: number;
    silver: number;
    bronze: number
  }>, country: string) {
    if (medalType.startsWith('1.') ) { // Assuming '1' represents Gold
      // @ts-ignore
      medalsByCountry.get(country).gold += 1;
    } else if (medalType.startsWith('2.')) { // Assuming '2' represents Silver
      // @ts-ignore
      medalsByCountry.get(country).silver += 1;
    } else if (medalType.startsWith('3.')) { // Assuming '3' represents Bronze
      // @ts-ignore
      medalsByCountry.get(country).bronze += 1;
    }
  }
}