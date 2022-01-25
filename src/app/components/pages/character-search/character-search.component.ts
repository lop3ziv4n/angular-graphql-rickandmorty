import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {DataService} from '@shared/services/data.service';
import {debounceTime, distinctUntilChanged, filter, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})
export class CharacterSearchComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private dataService: DataService) {
    this.onSearch();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  onClear(): void {
    this.search.reset();
    this.dataService.getDataAPI();
  }

  private onSearch(): void {
    this.search.valueChanges.pipe(
      map(search => search?.toLowerCase().trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== '' && search?.length > 2),
      tap(search => this.dataService.filterData(search)),
      takeUntil(this.destroy$)
    ).subscribe();
  }


}
