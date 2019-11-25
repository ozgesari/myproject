export class TransactionRequest {
        public fromDate: string;
        public toDate: string;
        public status: string;
        public filterField: string;
        public operation: string;
        public paymentMethod: string;
        public errorCode: string;
        public merchant: string;
        public acquirer: string;

        constructor(fromDate: string, toDate: string, status: string, filterField: string, operation: string, paymentMethod: string, errorCode: string, merchant: string, acquirer: string) {
                this.fromDate = fromDate;
                this.toDate = toDate;
                this.status = status;
                this.filterField = filterField;
                this.operation = operation;
                this.paymentMethod = paymentMethod;
                this.errorCode = errorCode;
                this.merchant = merchant;
                this.acquirer = acquirer;
        }
}