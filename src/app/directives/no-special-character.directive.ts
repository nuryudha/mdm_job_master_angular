import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noSpecialCharacters]',
})
export class NoSpecialCharacterDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const inputValue = this.el.nativeElement.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    if (inputValue !== sanitizedValue) {
      this.el.nativeElement.value = sanitizedValue;
    }
  }
}
