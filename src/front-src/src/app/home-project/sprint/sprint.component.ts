import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Task } from '../../objects/Task';
import { UserStory } from '../../objects/UserStory';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

	private addTaskMode : boolean = false;
	private taskList = [];
	private sprintUS = [];
	private taskModel= {
		id: 0 ,
		description: '',
		developer: '',
		status:'',
		onEdit: false
	};

	private sprint = {
		id:1,
		idProject:1,
		begin: '01/01/01',
		end:'12/12/12'
	}

	private idTask : number = 1;
	private developers = [];
	private taskTableView : boolean = true;

  constructor(private el: ElementRef) {
	}

  ngOnInit() {
		this.developers.push(new String("jean"));
		this.developers.push(new String("jean-philipe"));
		this.developers.push(new String("quelleestladifférenceentreunepouleetunemaison"));

		this.sprintUS.push(new UserStory(1,"Une us initiale", 0, 0,"TODO"));
  }

	resetModel() {
		this.taskModel.id=0;
		this.taskModel.description='';
		this.taskModel.developer='';
		this.taskModel.status='';
		this.taskModel.onEdit = false;
	}

	onEditRow(ligne) {
		ligne['onEdit'] = true;
		let tr_id = "#TASK" + ligne['id'];
		this.el.nativeElement.querySelector(tr_id).classList.add("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onBackRow(ligne) {
		ligne['onEdit'] = false;
		let tr_id = "#TASK" + ligne['id'];
		this.el.nativeElement.querySelector(tr_id).classList.remove("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onConfirmRow(ligne) {
		ligne['onEdit'] = false;
		let tr_id = "#TASK" + ligne['id'];
		this.el.nativeElement.querySelector(tr_id).classList.remove("table-info");
		let tab = this.el.nativeElement.querySelectorAll(tr_id + " .editable");
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onDeleteRow(ligne) {
		let i = this.taskList.indexOf(ligne);
		this.taskList.splice(i,1);
	}

	onEdit() {
		this.addTaskMode = true;
		this.taskTableView = true;
	}

	onBack() {
		this.addTaskMode = false;
	}

	onConfirm() {
		this.addTaskMode = false;
		this.taskList.push(new Task(
			this.idTask,
			this.taskModel.description,
			this.taskModel.developer,
			this.taskModel.status
		));
		this.idTask++;
		this.resetModel();
	}


	editSprint() {
	}

	taskView(value) {
		this.taskTableView = value;
	}

}
