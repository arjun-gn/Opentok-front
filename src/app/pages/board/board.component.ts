import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from 'src/app/components/card-modal/card-modal.component';
import { Card, List } from 'src/app/models/boardModel';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  allLists: List[] = [];
  allCards: Card[] = [];
  dropList: string[] = [];
  constructor(private boardService: BoardService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllLists();
    this.getAllCards();
  }

  getAllLists() {
    this.boardService.getAllLists().subscribe((res: any) => {
      this.allLists = res.data.allLists;
      this.allLists.map((list: List) => {
        this.dropList.push(list._id);
      });
    });
  }

  getAllCards() {
    this.boardService.getAllCards().subscribe((res: any) => {
      this.allCards = res.data.allcards;
    });
  }

  openCardDialog(index: number) {
    const dialogRef = this.dialog.open(CardModalComponent, {
      data: 'card',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addCard(result, index);
    });
  }

  addCard(cardData: any, index: number) {
    if (cardData?.title) {
      this.boardService
        .createCard({
          title: cardData?.title,
          description: cardData?.description,
          list_id: this.allLists[index]._id,
        })
        .subscribe((res) => {
          this.getAllCards();
        });
    }
  }
  openListDialog() {
    const dialogRef = this.dialog.open(CardModalComponent, {
      data: 'list',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addList(result);
    });
  }
  addList(listData: any) {
    if (listData?.name) {
      this.boardService
        .createList({
          name: listData.name,
        })
        .subscribe((res) => {
          this.getAllLists();
        });
    }
  }
  deleteCard(id: string) {
    this.boardService.deleteCard(id).subscribe((res: any) => {
      this.getAllCards();
    });
  }
  deleteList(id: string) {
    this.boardService.deleteList(id).subscribe((res: any) => {
      this.allCards.map((card) => {
        if (card.list_id === id) {
          this.deleteCard(card._id);
        }
      });

      this.getAllLists();
    });
  }

  drop(event: CdkDragDrop<List[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.allCards[event.item.data].list_id = event.container.id;
    }
  }
}
