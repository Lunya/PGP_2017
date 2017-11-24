import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

	private connected = this.auth.token !== null;
	user = 'USERNAME';

  constructor(private auth: AuthService) {
	}

  ngOnInit() {
		if(this.auth.token)
		this.connected = true;
		else this.connected = false;
  }

}
