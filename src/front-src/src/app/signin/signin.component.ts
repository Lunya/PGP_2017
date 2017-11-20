import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	loading = false;
	model = {username: '', password: ''};

	constructor(
		private router: Router,
		private authService: AuthService
	) {}
	ngOnInit() {
		this.authService.logout();
	}
	login() {
		this.loading = true;
		this.authService.login({
			username: this.model.username,
			password: this.model.password})
			.subscribe(result => {
				console.log(result);
				if (result) {
					this.router.navigate(['projects'])
						.then(value => console.log('redirect: ', value))
						.catch(reason => console.log('redirect: ', reason));
				} else {
					console.log('Error : username or password incorrect');
					this.loading = false;
				}
			}, err => {
				this.loading = false;
				console.log(err);
			});
	}
}
