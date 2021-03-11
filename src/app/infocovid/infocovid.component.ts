import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid',
  templateUrl: './infocovid.component.html',
  styleUrls: ['./infocovid.component.css']
})
export class InfocovidComponent implements OnInit {


  public  hostafriq=this.configportService.urlafrique;


  constructor(public configportService:ConfigportService) { }

  ngOnInit(): void {

  }



}
