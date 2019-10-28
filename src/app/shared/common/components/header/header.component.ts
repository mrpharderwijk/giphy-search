import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { StateDataService } from '../../../services/state-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() loading: boolean;
  @Output() searchSubmitted: EventEmitter<string> = new EventEmitter(null);

  searchMode = false;

  constructor(private _stateDataService: StateDataService) {}

  ngOnInit() {}

  giphySearchSubmitted(searchQuery: string) {
    this.searchMode = false;
    this._stateDataService.addData({ searchQuery: searchQuery });
  }
}
