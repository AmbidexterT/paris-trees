import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../../../src/config';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {
  finalList;
  genreNumberList;
  rows = 20;
  start = 0;

  constructor(private http: HttpClient) {
  }

  configUrl = `${API_URL}&rows=${this.rows}&start=${this.start}`;

  public getDataSource(): Observable<any> {
    return this.http.get<any>(`${this.configUrl}`);
  }

  public processData(result) {
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
    this.finalList.sort((a, b) => {
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
    this.genreNumberList.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      return 0;
    });
    return [this.genreNumberList, this.finalList];
  }

}
