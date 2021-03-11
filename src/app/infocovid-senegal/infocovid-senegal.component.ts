import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid-senegal',
  templateUrl: './infocovid-senegal.component.html',
  styleUrls: ['./infocovid-senegal.component.css']
})
export class InfocovidSenegalComponent implements OnInit {

   hostsenegal=this.configportService.urlsenegal;
  constructor(public configportService:ConfigportService) { }

  ngOnInit(): void {
  }

}
