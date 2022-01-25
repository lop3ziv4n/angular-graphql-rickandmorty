import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character.component';
import {CharacterCardModule} from '@pages/character-card/character-card.module';


@NgModule({
  declarations: [
    CharacterComponent
  ],
    imports: [
        CommonModule,
        CharacterRoutingModule,
        CharacterCardModule
    ]
})
export class CharacterModule { }
