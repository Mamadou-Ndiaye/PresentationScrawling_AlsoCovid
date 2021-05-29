import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-wp2',
  templateUrl: './wp2.component.html',
  styleUrls: ['./wp2.component.css']
})
export class Wp2Component implements OnInit {

  public res: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("./../assets/image/data.json").subscribe(data =>{
      console.log(data);
      this.res = data;
    })
  }

}
