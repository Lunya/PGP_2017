export class Version {
  public id: number;
  public numVersionMaj: number;
  public numVersionMin: number;
  public idProject: number;
  public linkDoc: string;
  public linkTest: string;
  public linkSource: string;
  public linkBuild: string;

	constructor(
      id = -1,
  		numVersionMaj = -1,
      numVersionMin = -1,
  		idProject = -1,
  		linkDoc = '',
  		linkTest = '',
  		linkSource = '',
  		linkBuild = ''
    ) {
    this.id = id;
    this.numVersionMaj=numVersionMaj;
    this.numVersionMin=numVersionMin;
    this.idProject=idProject;
    this.linkDoc=linkDoc;
    this.linkTest=linkTest;
    this.linkSource=linkSource;
    this.linkBuild=linkBuild;
	}
}
