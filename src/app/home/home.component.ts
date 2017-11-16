import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  model1 = {username: '', password: ''};
  //model1 = {mail: '', mdp: ''};
  model2 = {username: '', password: '', confirm: ''};


  constructor(private router: Router, private authService: AuthService) {
   }
  loading1 = false;
  loading2 = false;

  ngOnInit() {
  }


  login() {
		this.loading1 = true;
		this.authService.login({
			username: this.model1.username,
			password: this.model1.password})
			.subscribe(result => {
				if (result)
					this.router.navigate(['/projects']);
				else {
					console.log('Error : username or password incorrect');
					this.loading1 = false;
				}
			});
	}

  new() {
		this.loading2 = true;
		this.authService.login({
			username: this.model2.username,
			password: this.model2.password,
      confirm : this.model2.confirm})
			.subscribe(result => {
				if (result)
					this.router.navigate(['/projects']);
				else {
					console.log('Error : username or password incorrect');
					this.loading2 = false;
				}
			});
	}
}
