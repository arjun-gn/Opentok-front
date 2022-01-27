import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpentokService {
  baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getSession() {
    return this.http.get(this.baseUrl);
  }

  startArchiving() {
    return this.http.post(this.baseUrl+'/start',{hasAudio:true,hasVideo:true,outputMode:'composed'});
  }

  stopArchiving(archiveId:string){
    return this.http.get(this.baseUrl+`/stop/${archiveId}`);
  }
}
