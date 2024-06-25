import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() filterFields: { key: string, label: string }[] = [];
  filters: { [key: string]: string } = {};

  @Output() filterChange = new EventEmitter<any>();

  applyFilters(): void {
    this.filterChange.emit(this.filters);
  }
}
