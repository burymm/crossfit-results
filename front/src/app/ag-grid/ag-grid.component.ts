import { Component, OnInit } from '@angular/core';
import { assign, map, first, filter, isNil } from 'lodash';
import {Exercise} from "../models/models";
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  columnDefs = [
    {headerName: 'Date', field: 'trainingDate', minWidth: 50},
    {headerName: 'Card Number', field: 'cardNumber', minWidth: 50 },
    {headerName: 'Exercise', field: 'exerciseName', minWidth: 50},
    {headerName: 'Result', field: 'workoutResult', minWidth: 50}
  ];

  rowData: any;


  constructor(private resultService: ResultsService) { }

  ngOnInit() {
    this.rowData = this.resultService.getResults();
  }
}
