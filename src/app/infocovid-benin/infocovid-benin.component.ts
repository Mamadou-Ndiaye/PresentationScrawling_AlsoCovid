import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid-benin',
  templateUrl: './infocovid-benin.component.html',
  styleUrls: ['./infocovid-benin.component.css']
})
export class InfocovidBeninComponent implements OnInit {


  hostbenin= this.configportService.urlbenin;

  constructor(public documentsService:DocumentsService,public configportService:ConfigportService) { }

  ngOnInit(): void {
  }

}
