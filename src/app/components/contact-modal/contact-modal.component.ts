import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  @Input() title = '';
  addressForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+91-|\+91|0)?\d{10}$/),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ]),
      city: new FormControl('', Validators.required),
      houseLaneStreet: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }

}
