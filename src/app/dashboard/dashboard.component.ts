import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public transactionIdForTransactionSearch: string;
  public transactionIdForClientSearch: string;

  constructor() { }

  ngOnInit() {
  }
}