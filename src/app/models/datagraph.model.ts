import {DatasetInterface} from "./dataset.model";

export interface DataGraphInterface {
  labels: string[];
  datasets: DatasetInterface[];
}
