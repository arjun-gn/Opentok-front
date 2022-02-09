import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  cardForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modelType:string,
  ) {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required),
    });
  }

  closeCard() {
    if (this.dialogRef._containerInstance) this.dialogRef.close();
    console.log(this.modelType);
  }
  submitData() {
    this.dialogRef.close(this.cardForm.value);
  }
}
