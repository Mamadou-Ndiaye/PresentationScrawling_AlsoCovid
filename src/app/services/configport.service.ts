import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigportService {

  //public  urlafrique ="http://127.0.0.1:8050/";
  public  urlafrique="https://alsocovid19.ucad.sn:8743/";
  public  urlbenin ="http://127.0.0.1:8051/";
  public  urlburkina="http://127.0.0.1:8052/";
  public  urlgabon="http://127.0.0.1:8053/";
  public  urlmali="http://127.0.0.1:8054/";
  //public  urlsenegal="http://127.0.0.1:8055/";
  public  urlsenegal="https://alsocovid19.ucad.sn:8081/";

  constructor() { }
}
