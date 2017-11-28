import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
	private id: number;

	constructor() { }

	ngOnInit() {
	}

	setId(id: number) {
		this.id = id;
	}
}
