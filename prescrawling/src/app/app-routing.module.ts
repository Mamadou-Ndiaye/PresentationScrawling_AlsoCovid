import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebDocumentsComponent} from "./web-documents/web-documents.component";
import {LoginComponent} from "./login/login.component";
import {CategoriesComponent} from "./categories/categories.component";
import {AuthguardService} from "./services/authguard.service";
// ,canActivate : [AuthguardService]
const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:"documents",component:WebDocumentsComponent},
  {path: "login",component: LoginComponent},
  {path: "categories",component: CategoriesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
