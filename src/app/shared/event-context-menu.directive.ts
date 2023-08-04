import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[appEventContextMenu]'
})

export class EventContextMenuDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}
