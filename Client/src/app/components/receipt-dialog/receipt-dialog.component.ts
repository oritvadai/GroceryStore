import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';

export interface DialogData {
    orderId: string;
}

@Component({
    selector: 'app-receipt-dialog',
    templateUrl: './receipt-dialog.component.html',
    styleUrls: ['./receipt-dialog.component.css']
})
export class ReceiptDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ReceiptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public orderService: OrderService,
        public router: Router) { }

    ngOnInit(): void {
    }

    onClose(): void {
        this.dialogRef.close();
        this.router.navigateByUrl("/home");
    }

    onDLReceipt(): void {
        this.orderService
            .getOrderReceipt(this.data.orderId)
            .subscribe(receipt => {
                console.log("download receipt", typeof receipt.receipt)
                const receiptBlob = new Blob([receipt.receipt],  {
                    type: 'application/octet-stream'
                });
                const fileURL = URL.createObjectURL(receiptBlob);
                console.log(fileURL);
                const a = document.createElement("a");
                a.href = fileURL;
                a.download = "receipt.txt";
                a.click();
            });
    }
}
