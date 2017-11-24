import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

const url = 'http://localhost:3000/api/register';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
	private loading = false;
	private form = {
		username: '',
		mail: '',
		password: '',
		passwordVerif: ''
	};

	constructor(
		private http: HttpClient,
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit() {}
	ngOnSubmit() {
		if (this.form.password === this.form.passwordVerif) {
			this.loading = true;
			const request = {
				username: this.form.username,
				password: this.form.password,
				mail: this.form.mail};
			this.http.post(url, request)
					.subscribe((result: any) => {
						if (result.error) {
							this.loading = false;
						} else {
							// si l'utilisateur à été créé, le connecter et le rediriger
							this.auth.login(request).subscribe((result: any) => {
								if (result) {
									this.router.navigate(['projects'])
										.catch(reason => console.log('redirect: ', reason));
								} else {
									console.log('Error : username or password incorrect');
									this.loading = false;
								}
							});
						}
					},
					err => {
						console.log(err);
						this.loading = false;
					});
		}
	}
}
