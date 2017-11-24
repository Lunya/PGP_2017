export class LigneTabUS{
  id : number;
  desc : string;
  dif : number;
  prio : number;
  done : string;
	onEdit: boolean;
  constructor(i:number, d:string,di:number,pri:number,don:string){
    this.id = i;
    this.desc = d;
    this.dif = di;
    this.prio = pri;
    this.done = don;
		this.onEdit = false;
  }
}
