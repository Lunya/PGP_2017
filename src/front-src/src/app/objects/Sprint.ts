export class Sprint {
  id : number;
  us : string;
  description : string;
  status : string;

  constructor(id, us, description, status) {
    this.id = id;
    this.us = us;
    this.description = description;
    this.status = status;
  }
}
