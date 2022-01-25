import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'characters', pathMatch: 'full'},
  {path: 'episodes', loadChildren: () => import('@pages/episodes/episodes.module').then(m => m.EpisodesModule)},
  {path: 'characters', loadChildren: () => import('@pages/characters/characters.module').then(m => m.CharactersModule)},
  {path: 'character/:id', loadChildren: () => import('@pages/character/character.module').then(m => m.CharacterModule)},
  {path: '**', redirectTo: 'characters', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
