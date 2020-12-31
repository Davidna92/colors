import { Component, OnInit } from '@angular/core';
import { Square } from '../models/square';
import { BoardService } from '../board.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: Square[];
  squareToChange: Square;
  squareColor: string;


  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getSquares().subscribe(squares => {
      // console.log(squares);
      this.squares = squares;
      this.getColor()
    })
  }

  getColor() {
    this.squares.forEach((square) => {
      // console.log(square.color);
      this.squareColor = square.color;
    })
  }

  changeColor(square: Square) {
    this.boardService.updateColor(square);
  }


}
