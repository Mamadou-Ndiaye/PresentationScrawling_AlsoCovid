import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid-gabon',
  templateUrl: './infocovid-gabon.component.html',
  styleUrls: ['./infocovid-gabon.component.css']
})
export class InfocovidGabonComponent implements OnInit {

  hostgabon=this.configportService.urlgabon;

  constructor(public configportService:ConfigportService) { }

  ngOnInit(): void {
  }

}
