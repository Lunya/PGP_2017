import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	public token: string;

	constructor(private http: HttpClient) {
		this.token = localStorage.getItem('token');
	}

	login(credentials): Observable<boolean> {
		return this.http.post('/api/connect', credentials)
			// .map((response: Response) => response.json())
			.map((response: any) => {
				if (response.token) {
					this.token = response.token;
					localStorage.setItem('token', response.token);
					return true;
				}
				return false;
			});
	}
	logout(): void {
		this.token = null;
		localStorage.removeItem('token');
	}
}
