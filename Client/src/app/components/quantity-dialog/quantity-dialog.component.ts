import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    quantity: number;
    isConfirmed: boolean;
}

@Component({
    selector: 'app-quantity-dialog',
    templateUrl: './quantity-dialog.component.html',
    styleUrls: ['./quantity-dialog.component.css']
})
export class QuantityDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<QuantityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit(): void {
        this.data.quantity = 1;
    }

    onNoClick(): void {
        this.data.isConfirmed = false;
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.data.isConfirmed = true;
    }
}
