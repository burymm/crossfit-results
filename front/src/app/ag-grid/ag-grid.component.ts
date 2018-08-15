import { Component, OnInit } from '@angular/core';
import { assign, map, first, filter, isNil } from 'lodash';
import {Exercise} from "../models/models";
import { HttpClient } from '@angular/common/http';

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


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('/results');
  }


}
