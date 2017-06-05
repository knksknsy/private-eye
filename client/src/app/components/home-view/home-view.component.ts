import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  public piID: string;

  constructor() { }

  ngOnInit() {
  }

  public handleMap(id) {
    this.piID = id;
  }

}
