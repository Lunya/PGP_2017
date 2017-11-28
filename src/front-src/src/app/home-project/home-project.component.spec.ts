import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProjectComponent } from './home-project.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ProjectComponent } from './project/project.component';
import { SprintComponent } from './sprint/sprint.component';
import { UserInfoComponent } from './user-info/user-info.component';

const mockRouter = {
	navigate: jasmine.createSpy('navigate'),
	params: Observable.of({id: 1})
};

describe('HomeProjectComponent', () => {
	let component: HomeProjectComponent;
	let fixture: ComponentFixture<HomeProjectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				NgbModalModule
			],
			declarations: [
				HomeProjectComponent,
				SidebarComponent,
				ProjectComponent,
				SprintComponent,
				UserInfoComponent
			],
			providers: [
				{ provide: ActivatedRoute, useValue: mockRouter },
				NgbModal,
				NgbModalStack,
				NgbModalBackdrop
			],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeProjectComponent);
		component = fixture.componentInstance;
		expect(component.sidebar).toBeDefined();
		expect(component.sidebar.onSelectProject).toBeDefined();
		expect(component.sidebar.onSelectSprint).toBeDefined();
		expect(component.sidebar.onNewSprint).toBeDefined();
		expect(component.sidebar.onSelectUser).toBeDefined();
		expect(component.sidebar.onAddUser).toBeDefined();

		fixture.detectChanges();
	});

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
