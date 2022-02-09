import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './pages/board/board.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { RecordingsComponent } from './pages/recordings/recordings.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recordings', component: RecordingsComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: 'board', component: BoardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
