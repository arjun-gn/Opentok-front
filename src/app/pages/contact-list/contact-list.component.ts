import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { ContactModel } from 'src/app/models/genereal.model';
import { NylasService } from 'src/app/services/nylas.service';

const CONTACT_DATA: ContactModel[] = [];

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
  allContacts: any;
  displayedColumns: string[] = [
    'position',
    'name',
    'phone',
    'email',
    'action',
    'communication_options',
  ];
  dataSource = new MatTableDataSource(CONTACT_DATA);
  constructor(private nylasService: NylasService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.nylasService.getContacts().subscribe((res) => {
      this.allContacts = res;
      this.addContacts();
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addContacts() {
    let index = 1;
    this.allContacts?.map((contact: any) => {
      if (contact.given_name) {
        CONTACT_DATA.push({
          position: index,
          name: contact.given_name ? contact.given_name : 'n/a',
          email: contact.emails[0] ? contact.emails[0]?.email : 'N/A',
          phone: contact.phone_numbers[0]
            ? contact.phone_numbers[0]?.number
            : 'N/A',
        });
        this.dataSource = new MatTableDataSource(CONTACT_DATA);
        this.ngAfterViewInit();
        index++;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteContact(id: string) {
    this.nylasService.deleteContact(id).subscribe(() => {});
  }
}
