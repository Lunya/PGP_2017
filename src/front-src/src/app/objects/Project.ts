


export class Project {
	public id: number;
	public name: string;
	public creator: string;
	public description: string;
	public url: string;
	public begin: Date;
	public end: Date;
	public participant: String[];

	constructor(id, name, creator, description, url, begin, end, participant) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.url = url;
		this.begin = begin;
		this.end = end;
		this.participant = participant;
	}

}
