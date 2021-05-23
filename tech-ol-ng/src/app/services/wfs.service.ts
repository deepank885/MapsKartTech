import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WFSService {

  constructor(private httpClient: HttpClient) { }

  public getFeatureCount(lyrName:string):any{
    return this.httpClient.get('http://183.82.99.134:8086/geoserver/wfs?request=GetFeature&typeName=cite:'+lyrName+'-Tech&version=1.1.0&resultType=hits', {responseType: 'text'})
  }
}
