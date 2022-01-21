import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'home', component: SideNavComponent, outlet: "sidebar" }
];
@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
