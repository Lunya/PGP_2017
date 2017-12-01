export class Project {
	public id: number;
	public name: string;
	public description: string;
	public git: string;
	public begin: Date;
	public end: Date;

	constructor(
		id = -1,
		name = '',
		description = '',
		git = '',
		begin = new Date(),
		end = new Date()) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.git = git;
		this.begin = begin;
		this.end = end;
	}
}
