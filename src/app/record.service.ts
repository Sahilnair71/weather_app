import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class RecordService {

  key='0bf934f2b33cec16618235240b206134';
  appkey='35163da5245c49bdb432cf9faf702e1e';


  constructor(private httpclient:HttpClient) {}
  getcomments(lat:number,lon:number):Observable<any>{
        return this.httpclient.get(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${this.appkey}`)

  }
  getvalue(lat:number,lon:number):Observable<any>{
    return this.httpclient.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${this.appkey}`)
  }

}
