export class Project {
  nom : string;
  description : string;
  URLDepot : string;
  datedebut : string;
  datefin : string;
  constructor(name:string, desc:string, url:string, deb:string, fin:string){
    this.nom = name;
    this.description = desc;
    this.URLDepot = url;
    this.datedebut = deb;
    this.datefin = fin;
  }
}
