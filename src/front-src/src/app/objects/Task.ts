export class Task {
  id : number;
  description : string;
  developer : string;
  status : string;
	onEdit: boolean;

  constructor(id , description, developper, state) {
    this.id = id;
    this.description = description;
    this.developer = developper;
    this.status = state;
		this.onEdit = false;
  }
}
