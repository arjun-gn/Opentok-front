import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/boardModel';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  allLists: List[] = [];
  constructor(private boardService: BoardService) {}
  ngOnInit(): void {
    this.getAllLists();
  }

  getAllLists() {
    this.boardService.getAllLists().subscribe((res: any) => {
      console.log(res);

      this.allLists = res.data.allLists;
      console.log(this.allLists);
    });
  }
  addCard(index: number) {
    console.log(this.allLists[index]);
  }
}
