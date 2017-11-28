import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

const url = 'http://localhost:3000/api/account';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	private loading = false;
	private signupForm: FormGroup;

	constructor(
		private http: HttpClient,
		private router: Router,
		private fb: FormBuilder
	) {
		const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
		const newPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
		this.signupForm = this.fb.group({
			email: [null, [Validators.required, CustomValidators.email]],
			name: [null, [Validators.required, Validators.minLength(2)]],
			password: password,
			newPassword: newPassword
		});
	}

	ngOnInit() {}

	ngCancel() {
		this.router.navigate(['/home']);
	}

	ngOnSubmit() {
		this.loading = true;
		this.http.post(url, this.signupForm.value)
			.subscribe((result: any) => {
				if (result.error)
					this.loading = false;
				else {
					this.router.navigate(['/home'])
						.catch(reason => console.log(reason));
				}
			}, err => {
				console.log(err);
				this.loading = false;
			});

	}
}
