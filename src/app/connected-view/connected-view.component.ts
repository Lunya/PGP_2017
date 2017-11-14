import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-connected-view',
  templateUrl: './connected-view.component.html',
  styleUrls: ['./connected-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectedViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pseudo='username';
  onSelect(){
    alert();
  }
}
