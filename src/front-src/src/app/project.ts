export class Project {
	public id: number;
	public name: string;
	public description: string;
	public git: string;
	public begin: Date;
	public end: Date;
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
