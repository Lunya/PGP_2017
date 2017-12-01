export class Project {
	public id: number;
	public name: string;
	public description: string;
	public git: string;
	public begin: Date;
	public end: Date;

	constructor(id, name, description, git, begin, end) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.git = git;
		this.begin = begin;
		this.end = end;
	}
}
