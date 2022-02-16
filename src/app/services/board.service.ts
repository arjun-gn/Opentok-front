import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, List } from '../models/boardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baseUrl: string = 'http://localhost:3000/api/v1/boards/';
  constructor(private http: HttpClient) {}
  getAllLists() {
    return this.http.get(this.baseUrl);
  }
  createList(listData: {}) {
    return this.http.post(this.baseUrl, listData);
  }
  deleteList(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
  updateList(id: string, data: {}) {
    return this.http.patch(this.baseUrl + id, data);
  }
  getAllCards() {
    return this.http.get(this.baseUrl + 'cards');
  }
  createCard(cardData: {}) {
    return this.http.post(this.baseUrl + 'cards', cardData);
  }
  deleteCard(id: string) {
    return this.http.delete(this.baseUrl + `card/${id}`);
  }
  updateCard(id: string, data: {}) {
    return this.http.patch(this.baseUrl + `card/${id}`, data);
  }
}
