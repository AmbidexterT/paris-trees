import {Component, OnInit, ViewChild,} from '@angular/core';
import {ChartComponent} from "angular2-chartjs";
import {DataService} from "../../services/data.service";
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService, GraphService]
})


export class ListComponent implements OnInit {
  finalList;
  genreNumberList;
  type;
  data;
  options;
  @ViewChild('chartComponent', {static: false}) chartComponent: ChartComponent;

  constructor(private dataService: DataService, private graphService: GraphService) {
  }

  ngOnInit(): void {
    this.dataService.getDataSource().subscribe(data => {
        this.genreNumberList = data[0];
        this.finalList = data[1];
        const config = this.graphService.updateData(this.genreNumberList);
        this.data = config.data;
        this.options = config.options;
        this.type = config.type;
      }
    );
  }

  arrondByName(index, item) {
    return item.name;
  }
}
