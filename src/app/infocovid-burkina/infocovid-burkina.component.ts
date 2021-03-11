import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid-burkina',
  templateUrl: './infocovid-burkina.component.html',
  styleUrls: ['./infocovid-burkina.component.css']
})
export class InfocovidBurkinaComponent implements OnInit {

   hostburkina=this.configportService.urlburkina;
  constructor(public documentsService:DocumentsService,public configportService:ConfigportService) { }

  ngOnInit(): void {
  }

}
