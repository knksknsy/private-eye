import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onMenuItemSelected: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openMenuItem() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("stopScrolling");
    this.onMenuItemSelected.emit();
    // this.router.navigate(['/component_name']);
  }

}
