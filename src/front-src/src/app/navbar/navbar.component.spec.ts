import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NavbarComponent],
			providers: [
				AuthService
			],
			imports: [
				HttpClientModule,
				NgbModalModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
