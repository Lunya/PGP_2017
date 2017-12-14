export class Version {
  public id: number;
  public num_version_maj: number;
  public num_version_min: number;
  public id_project: number;
  public link_doc: string;
  public link_test: string;
  public link_source: string;
  public link_build: string;

	constructor(
      id = -1,
  		num_version_maj = -1,
      num_version_min = -1,
  		id_project = -1,
  		link_doc = '',
  		link_test = '',
  		link_source = '',
  		link_build = ''
    ) {
    this.id = id;
    this.num_version_maj=num_version_maj;
    this.num_version_min=num_version_min;
    this.id_project=id_project;
    this.link_doc=link_doc;
    this.link_test=link_test;
    this.link_source=link_source;
    this.link_build=link_build;
	}
}
