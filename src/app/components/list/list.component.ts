import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "angular2-chartjs";
import {DataService} from "../../services/data.service";
import {GraphService} from "../../services/graph.service";
import {ItemInterface} from '../../models/item.model'
import {DataGraphInterface} from "../../models/datagraph.model";
import {OptionInterface} from "../../models/option.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DataService, GraphService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListComponent implements OnInit {
  finalList: ItemInterface[];
  genreNumberList: ItemInterface[];
  type: string;
  data: DataGraphInterface;
  options: OptionInterface;

  @ViewChild('chartComponent', {static: false}) chartComponent: ChartComponent;

  constructor(private dataService: DataService, private graphService: GraphService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataService.getDataSource().subscribe(data => {
        const processData = this.dataService.processData(data);
        const {genreNumberList, finalList} = processData;
        this.genreNumberList = genreNumberList;
        this.finalList = finalList;
        const config = this.graphService.updateData(this.genreNumberList);
        this.data = config.data;
        this.options = config.options;
        this.type = config.type;
        this.cdRef.detectChanges();
      }
    );
  }

  trackByName(index: number, item: ItemInterface): string {
    return item.name;
  }
}
