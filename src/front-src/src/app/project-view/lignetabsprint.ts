export class LigneTabSprint{
  idSp : number;
  usSp : string;
  descSp : string;
  statutSp : string;
  constructor(i:number, u:string,des:string,stat:string){
    this.idSp = i;
    this.usSp = u;
    this.descSp = des;
    this.statutSp = stat;
  }
}
