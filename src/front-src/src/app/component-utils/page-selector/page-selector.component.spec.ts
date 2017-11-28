import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSelectorComponent } from './page-selector.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageSelectorComponent', () => {
	let component: PageSelectorComponent;
	let fixture: ComponentFixture<PageSelectorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PageSelectorComponent ],
			imports: [ RouterTestingModule ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
