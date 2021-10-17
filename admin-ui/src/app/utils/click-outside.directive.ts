import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickZone]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) {
  }

  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement): boolean | undefined {
    const ignore = this.hasSomeParentTheClass(targetElement, ['ck-toolbar', 'inside']);
    if (ignore) { return undefined; }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    this.clickOutside.emit(clickedInside);
  }

  hasSomeParentTheClass(element, classname) {
    if (element.className && element.className.split) {
      const classes = element.className.split(' ');
      for (let i = 0; i < classname.length; i++) {
        if (classes.indexOf(classname[i]) >= 0) { return true; }
      }
    }
    return element.parentNode && this.hasSomeParentTheClass(element.parentNode, classname);
  }

}
