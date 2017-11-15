import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
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
				if (result)
					this.router.navigate(['/projects']);
				else {
					console.log('Error : username or password incorrect');
					this.loading = false;
				}
			});
	}
}
