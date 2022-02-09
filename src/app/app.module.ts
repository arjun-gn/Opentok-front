import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RecordingsComponent } from './pages/recordings/recordings.component';
import { MatTableModule } from '@angular/material/table';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { MatSortModule } from '@angular/material/sort';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BoardComponent } from './pages/board/board.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';
@NgModule({
  declarations: [
    SideNavComponent,
    HomeComponent,
    AppComponent,
    RecordingsComponent,
    ContactListComponent,
    ContactModalComponent,
    BoardComponent,
    CardModalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
