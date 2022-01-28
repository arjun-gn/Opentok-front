import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NylasService {
  baseUrl: string = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  getContacts(){
    return this.http.get(this.baseUrl + 'contacts');
  }
  getMessages() {
    return this.http.get(this.baseUrl + 'messages');
  }
  deleteContact(id:string){
    return this.http.get(this.baseUrl + `messages/${id}`);
  }
}
