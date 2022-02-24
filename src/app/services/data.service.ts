import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {API_URL} from '../../../src/config';

@Injectable()
export class DataService {
  finalList;
  genreNumberList;
  rows = 20;
  start = 0;

  public getDataSource(): Observable<any> {
    const apiCall = fetch(`${API_URL}&rows=${this.rows}&start=${this.start}`)
      .then(result => result.json())
      .then(result => {
        const data = result?.records.map(x => x.fields);
        const groupByArrondissement = data.reduce((group, property) => {
          const {arrondissement} = property;
          group[arrondissement] = group[arrondissement] ?? [];
          group[arrondissement].push(arrondissement);
          return group;
        }, {});

        function toArray(object) {
          const keys = Object.keys(object);
          const values = Object.values(object);
          const result = [];
          for (let i = 0; i < keys.length; i++) {
            // @ts-ignore
            result.push({name: keys[i], count: values[i].length})
          }
          return result;
        }

        this.finalList = toArray(groupByArrondissement);
        this.finalList.sort(function (a, b) {
          if (a.count > b.count) {
            return -1;
          }
          if (a.count < b.count) {
            return 1;
          }
          return 0;
        });

        //getting genre list
        const groupByGenre = data.reduce((group, property) => {
          const {genre} = property;
          group[genre] = group[genre] ?? [];
          group[genre].push(genre);
          return group;
        }, {});

        this.genreNumberList = toArray(groupByGenre);
        this.genreNumberList.sort(function (a, b) {
          if (a.count > b.count) {
            return -1;
          }
          if (a.count < b.count) {
            return 1;
          }
          return 0;
        });
        return [this.genreNumberList, this.finalList]
      });
    return from(apiCall);
  }


}
