import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";
import {ConfigportService} from "../services/configport.service";

@Component({
  selector: 'app-infocovid-mali',
  templateUrl: './infocovid-mali.component.html',
  styleUrls: ['./infocovid-mali.component.css']
})
export class InfocovidMaliComponent implements OnInit {

  mali=this.configportService.urlmali;
  constructor(public configportService:ConfigportService) { }

  ngOnInit(): void {
  }

}
