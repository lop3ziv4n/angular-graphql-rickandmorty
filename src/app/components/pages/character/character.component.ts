import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '@shared/services/data.service';
import {take, tap} from 'rxjs/operators';
import {Character} from '@shared/interfaces/data.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character$: Observable<Character>;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
    this.route.params.pipe(
      take(1),
      tap(({id}) => this.character$ = this.dataService.getCharactersById(id))
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
