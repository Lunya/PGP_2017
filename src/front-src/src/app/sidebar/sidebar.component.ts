import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	private content: {
		sprints: Array<{ id: number, name: string }>,
		users: Array<{ id: number, name: string, email: string }>};

	@Output() onSelectSprint = new EventEmitter<number>();
	@Output() onSelectUser = new EventEmitter<number>();
	@Output() onAddUser = new EventEmitter<void>();

	@ViewChild('project') private projectElement: ElementRef;
	@ViewChild('sprints') private sprintsElement: ElementRef;
	@ViewChild('users') private usersElement: ElementRef;

	constructor() { }

	ngOnInit() {
	}

	setContent(content): void {
		this.content = content;
	}

	private unselectAllItemsAndSelectOne(element: HTMLElement): void {
		this.projectElement.nativeElement.classList.remove('active');
		this.sprintsElement.nativeElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
		this.usersElement.nativeElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
		element.classList.add('active');
	}

	onProjectSelected(): void {
		this.unselectAllItemsAndSelectOne(this.projectElement.nativeElement);
	}

	onSprintSelected(event: MouseEvent, sprintId: number): void {
		this.onSelectSprint.emit(sprintId);
		let target: any = event.target || event.srcElement || event.currentTarget;
		this.unselectAllItemsAndSelectOne(target);
	}

	onUserSelected(event: MouseEvent, userId: number): void {
		this.onSelectUser.emit(userId);
		let target: any = event.target || event.srcElement || event.currentTarget;
		this.unselectAllItemsAndSelectOne(target);
	}

	onUserAdd(): void {
		this.onAddUser.emit();
	}
}
