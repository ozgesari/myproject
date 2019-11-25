import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TransactionService } from '../service/transaction.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TransactionRequest } from '../models/transactionRequest';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  transactionRequest: TransactionRequest;
  transactionResponse: any;
  modalIndex: number;
  transactionId: string;
  transactionDetailResponse: any;
  errorResponse: any;
  currentPage: number;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
        this.transactionId = params.get('id');
        if(this.transactionId) {
          this.transactionService.getTransactionDetails(this.transactionId)
          .pipe()
          .subscribe(
            result => {
              this.transactionDetailResponse = result;
            },
            err => {
              this.transactionDetailResponse = null;
              this.errorResponse = err.error;

              // Re-route to login if token is expired.
              if(err.status == 401) { this.router.navigate(['login']); }
            });
        }
    });
    
    this.transactionForm = this.formBuilder.group({
      startDate: ['1999-07-01', Validators.required],
      endDate: ['2019-11-01', Validators.required],
      status: ['', Validators.required],
      filterField: ['', Validators.required],
      operation: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      errorCode: ['', Validators.required],
      merchant: ['', Validators.required],
      acquirer: ['', Validators.required]
    });
  }

  get formInputs() {
    return this.transactionForm.controls;
  }

  onSubmit() {
    this.transactionService.getTransactions(this.mapFields(), this.currentPage)
      .pipe()
      .subscribe(
        result => {
          this.transactionResponse = result;
        },
        err => {
          this.transactionResponse = null;
          this.errorResponse = err.error;
          // Re-route to login if token is expired.
          if(err.status == 401) { this.router.navigate(['login']); }
        });
  }

  mapFields() {
    return new TransactionRequest(
      this.formInputs.startDate.value, 
      this.formInputs.endDate.value, 
      this.formInputs.status.value,
      this.formInputs.filterField.value,
      this.formInputs.operation.value,
      this.formInputs.paymentMethod.value,
      this.formInputs.errorCode.value,
      this.formInputs.merchant.value,
      this.formInputs.acquirer.value);
  }

  assignModelIndex(index: number) {
    this.modalIndex = index;
  }

  goToPage(page: number) {
    if(page == 0) return;
    this.currentPage = page;
    this.onSubmit();
  }
}