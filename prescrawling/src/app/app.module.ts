import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebDocumentsComponent } from './web-documents/web-documents.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import {FormsModule} from "@angular/forms";
import {NgxImageGalleryModule} from "ngx-image-gallery";
import { ArticlesComponent } from './articles/articles.component';
import { NaturesComponent } from './natures/natures.component';
import { PlosonesComponent } from './plosones/plosones.component';
import { BasesComponent } from './bases/bases.component';


@NgModule({
  declarations: [
    AppComponent,
    WebDocumentsComponent,
    LoginComponent,
    CategoriesComponent,
    ArticlesComponent,
    NaturesComponent,
    PlosonesComponent,
    BasesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  // on peut  definit ici les services de l app
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
