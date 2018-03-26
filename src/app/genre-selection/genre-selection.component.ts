import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-selection',
  templateUrl: './genre-selection.component.html',
  styleUrls: ['./genre-selection.component.css']
})
export class GenreSelectionComponent implements OnInit {

  constructor() { }

  orderableList = ['Jazz', 'Hip Hop', 'Rock'];

  ngOnInit() {

  }


  confirmGenreOrdering() {
    console.log(this.orderableList);
  }
}
