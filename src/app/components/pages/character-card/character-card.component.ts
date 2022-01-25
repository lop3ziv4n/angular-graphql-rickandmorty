import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Character} from '@shared/interfaces/data.interface';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent implements OnInit {

  @Input()
  character: Character;

  constructor() {
  }

  ngOnInit(): void {
  }

}
