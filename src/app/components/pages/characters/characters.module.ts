import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersComponent} from './characters.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CharacterSearchModule} from '@pages/character-search/character-search.module';


@NgModule({
  declarations: [
    CharactersComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CharactersRoutingModule,
    CharacterSearchModule
  ]
})
export class CharactersModule {
}
