export class ReportRequest {
        public fromDate: string;
        public toDate: string;
        public merchant: string;
        public acquirer: string;

        constructor(fromDate: string, toDate: string, merchant: string, acquirer: string) {
                this.fromDate = fromDate;
                this.toDate = toDate;
                this.merchant = merchant;
                this.acquirer = acquirer;
        }
}