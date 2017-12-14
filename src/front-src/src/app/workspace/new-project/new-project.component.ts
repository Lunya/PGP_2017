import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

const url = 'http://localhost:3000/api/project';

@Component({
	selector: 'app-new-project',
	templateUrl: '../../popups/popup-project.component.html'
})
export class NewProjectComponent implements OnInit {
	private projectForm: FormGroup;
	private beginDateModel: any;
	private endDateModel: any;

	private action: string;

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient,
		private auth: AuthService
	) {
		this.projectForm = this.fb.group({
			name: [null, [Validators.required]],
			description: [null, []],
			url: [null, [CustomValidators.url]],
			begin: [null, [Validators.required, /*CustomValidators.dateISO*/]],
			end: [null, [/*CustomValidators.dateISO*/]]
		});
	}

	ngOnInit() {
		this.action = 'New';
	}

	ngOnSubmit(): void {
		const body = this.projectForm.value;
		body.begin = this.beginDateModel.year.toString() + '-' + this.beginDateModel.month.toString() + '-' + this.beginDateModel.day.toString();
		console.log(body.begin);
		if (body.end) {
			body.end = this.endDateModel.year.toString() + '-' + this.endDateModel.month.toString() + '-' + this.endDateModel.day.toString();
		} else {
			body.end = null;
		}
		body.userId = localStorage.getItem('user.id');
		body.status = 'OWNER';
		let headers = new HttpHeaders();
		headers = this.auth.addAuthHeader(headers);
		this.http.post(url, body, {headers: headers}).subscribe((res: any) => {
			if (res.error) {
				console.log(res.reason);
			} else {
				this.activeModal.close('Form validated');
			}
		}, error => {
			console.log(error);
		});
	}
}
