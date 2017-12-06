export class Task {
	id: number;
	description: string;
	developer: string;
	state: string;
	onEdit: boolean;

	constructor(
		id = 0,
		description = '',
		developer = '',
		state = 'TODO',
		onEdit = false) {
		this.id = id;
		this.description = description;
		this.developer = developer;
		this.state = state;
		this.onEdit = false;
	}
}
