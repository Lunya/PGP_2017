import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SigninComponent } from '../signin/signin.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomeComponent,
				SigninComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
