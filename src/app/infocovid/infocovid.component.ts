import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../services/documents.service";

@Component({
  selector: 'app-infocovid',
  templateUrl: './infocovid.component.html',
  styleUrls: ['./infocovid.component.css']
})
export class InfocovidComponent implements OnInit {





  constructor(public documentsService:DocumentsService) { }

  ngOnInit(): void {

  }



}
