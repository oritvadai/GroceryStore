import { Component, Inject } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
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
export class QuantityDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<QuantityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.data.isConfirmed = false;
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.data.isConfirmed = true;
    }
}
