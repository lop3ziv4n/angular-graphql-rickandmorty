import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSearchComponent} from './character-search.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CharacterSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CharacterSearchComponent
  ]
})
export class CharacterSearchModule {
}
