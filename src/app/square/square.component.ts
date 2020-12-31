import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Square } from '../models/square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() square: Square;
  

  constructor() { }

  ngOnInit(): void {
    console.log(this.square);
  }





}
