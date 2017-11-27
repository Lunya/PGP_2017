


export class UserStory {
  id : number;
  description : string;
  difficulty : number;
  priority : number;
  status : string;
	onEdit: boolean;

  constructor(id , description, difficulty, priority, status) {
    this.id = id;
    this.description = description;
    this.difficulty = difficulty;
    this.priority = priority;
    this.status = status;
		this.onEdit = false;
  }
}
