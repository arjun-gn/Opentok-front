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
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RecordingsComponent } from './pages/recordings/recordings.component';
import { MatTableModule } from '@angular/material/table';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    SideNavComponent,
    HomeComponent,
    AppComponent,
    RecordingsComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
