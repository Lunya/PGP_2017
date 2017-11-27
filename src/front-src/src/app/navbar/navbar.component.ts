import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

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