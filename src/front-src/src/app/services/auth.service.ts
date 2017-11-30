import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const url = 'http://localhost:3000/api/login';

@Injectable()
export class AuthService {
	public token: string;

	constructor(private http: HttpClient) {
		this.token = localStorage.getItem('token');
	}

	login(credentials): Observable<boolean> {
		console.log("credentials");
		console.log(credentials);
		return this.http.post(url, credentials)
			// .map((response: Response) => response.json())
			.map((response: any) => {
				console.log("response.token");
				console.log(response.token);
				if (response.token) {
					this.token = response.token;
					localStorage.setItem('token', response.token);
					localStorage.setItem('user.id', response.id);
					localStorage.setItem('user.email', response.email);
					localStorage.setItem('user.name', response.name);
					return true;
				}
				return false;
			});
	}
	logout(): void {
		this.token = null;
		localStorage.removeItem('token');
		localStorage.removeItem('user.id');
		localStorage.removeItem('user.email');
		localStorage.removeItem('user.name');
	}
}
