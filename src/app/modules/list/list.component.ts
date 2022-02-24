import {Component, OnInit, ViewChild,} from '@angular/core';
import {ChartComponent} from "angular2-chartjs";
import {DataService} from "../../services/data.service";
import {GraphService} from "../../services/graph.service";
import {ItemInterface} from '../../models/item.model'
import {DataGraphInterface} from "../../models/datagraph.model";
import {OptionInterface} from "../../models/option.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService, GraphService]
})

export class ListComponent implements OnInit {
  finalList: Array<ItemInterface>;
  genreNumberList: Array<ItemInterface>;
  type: string;
  data: DataGraphInterface;
  options: OptionInterface;
  @ViewChild('chartComponent', {static: false}) chartComponent: ChartComponent;

  constructor(private dataService: DataService, private graphService: GraphService) {
  }

  ngOnInit(): void {
    this.dataService.getDataSource().subscribe(data => {
        const processData = this.dataService.processData(data)
        this.genreNumberList = processData[0];
        this.finalList = processData[1];
        const config = this.graphService.updateData(this.genreNumberList);
        this.data = config.data;
        this.options = config.options;
        this.type = config.type;
      }
    );
  }

  trackByName(index: number, item: ItemInterface) {
    return item.name;
  }
}
