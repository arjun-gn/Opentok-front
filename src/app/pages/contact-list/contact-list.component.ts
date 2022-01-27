import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactModel } from 'src/app/models/genereal.model';


const CONTACT_DATA: ContactModel[] = [
  {
    position: 1,
    name: 'Jithin',
    phone: 9785498314,
    email: 'ksjgkjsa@ksajdf.com',
  },
  { position: 2, name: 'Suma', phone: 9784653218, email: 'oasdhf@asoelkm.com' },
  { position: 3, name: 'Anish', phone: 6368944652, email: 'ksj.sjfd@lda.com' },
];

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'phone',
    'email',
    'action',
    'communication_options',
  ];
  dataSource = new MatTableDataSource(CONTACT_DATA);
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  constructor() {
  }

}
