import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {
  @Input() title = '';
  contactForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public contactData: any,
    public dialogRef: MatDialogRef<ContactModalComponent>

  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      officePhone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+91-|\+91|0)?\d{10}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+91-|\+91|0)?\d{10}$/),
      ]),
      email: new FormControl('', Validators.required),
      email2: new FormControl('', Validators.required),
    });

    this.contactForm.patchValue({
      ...this.contactData,
    });
  }

  closeModal() {
    if (this.dialogRef._containerInstance) this.dialogRef.close();
    this.contactForm.reset();
  }
}
