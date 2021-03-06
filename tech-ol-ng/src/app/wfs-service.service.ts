import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfsServiceService {

  constructor(private http:HttpClient) { }

  public getFeatureCount(lyrName:string):any{
    return this.http.get('http://183.82.99.134:8086/geoserver/wfs?request=GetFeature&typeName=cite:'+ lyrName +'-Tech&version=1.1.0&resultType=hits');
  }
}
