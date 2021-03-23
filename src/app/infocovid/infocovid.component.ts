import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-infocovid',
  templateUrl: './infocovid.component.html',
  styleUrls: ['./infocovid.component.css']
})
export class InfocovidComponent implements OnInit {


  public hostafriq?:any;
  public urlAfrique: SafeResourceUrl | undefined;


  constructor(public configportService:ConfigportService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.hostafriq=this.configportService.urlafrique;
      this.urlAfrique= this.sanitizer.bypassSecurityTrustResourceUrl(this.hostafriq);
  }



}
