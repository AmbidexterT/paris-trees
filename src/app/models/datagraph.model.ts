import {DatasetInterface} from "./dataset.model";

export interface DataGraphInterface {
  labels: Array<string>;
  datasets: Array<DatasetInterface>;
}
