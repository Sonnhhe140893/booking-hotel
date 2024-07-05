import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
    @Input() search : string = '';
    @Output() searchEvent = new EventEmitter<any>();

    constructor(){}

    emitSearch(){
        console.log(1);
        this.searchEvent.emit(this.search);

    }
}
