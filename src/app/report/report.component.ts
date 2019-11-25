import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TransactionService } from '../service/transaction.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TransactionRequest } from '../models/transactionRequest';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../service/report.service';
import { ReportRequest } from '../models/reportRequest';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  reportRequest: ReportRequest;
  reportResponse: any;
  errorResponse: any;

  constructor(private route: ActivatedRoute, private reportService: ReportService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {    
    this.reportForm = this.formBuilder.group({
      startDate: ['1999-07-01', Validators.required],
      endDate: ['2019-11-01', Validators.required],
      merchant: ['', Validators.required],
      acquirer: ['', Validators.required]
    });
  }

  get formInputs() {
    return this.reportForm.controls;
  }

  onSubmit() {
    this.reportService.getReport(this.mapFields())
      .pipe()
      .subscribe(
        result => {
          this.reportResponse = result;
        },
        err => {
          this.reportResponse = null;
          this.errorResponse = err.error;
          // Re-route to login if token is expired.
          if(err.status == 401) { this.router.navigate(['login']); }
        });
  }

  mapFields() {
    return new ReportRequest(
      this.formInputs.startDate.value,
      this.formInputs.endDate.value,
      this.formInputs.merchant.value,
      this.formInputs.acquirer.value);
  }
}