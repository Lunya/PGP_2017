import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[contenteditable]',
	host: { "contenteditable":"true" }
})
export class ContenteditableDirective {

  constructor() {
		}

	/*	OnInit() {
		this.el.nativeElement.setAttribute("contenteditable", "true");
}*/

}
