import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-infocovid-senegal',
  templateUrl: './infocovid-senegal.component.html',
  styleUrls: ['./infocovid-senegal.component.css']
})
export class InfocovidSenegalComponent implements OnInit {

   hostsenegal=this.configportService.urlsenegal;
   urlSenegal: SafeResourceUrl | undefined;
  constructor(public configportService:ConfigportService,public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.hostsenegal=this.configportService.urlsenegal;
    this.urlSenegal= this.sanitizer.bypassSecurityTrustResourceUrl(this.hostsenegal);
  }

}
