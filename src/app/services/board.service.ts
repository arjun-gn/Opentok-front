import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, List } from '../models/boardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baseUrl: string = 'http://localhost:3000/api/v1/boards';
  constructor(private http: HttpClient) {}
  getAllLists() {
    return this.http.get(this.baseUrl);
  }
  getAllCards() {
    return this.http.get(this.baseUrl + 'cards');
  }
  createCard(cardData: Card) {
    return this.http.post(this.baseUrl + 'cards', cardData);
  }
  createList(listData: List) {
    return this.http.post(this.baseUrl, listData);
  }
}
