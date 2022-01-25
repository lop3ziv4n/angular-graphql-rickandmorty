import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Character, DataResponse, Episode} from '@shared/interfaces/data.interface';
import {catchError, pluck, take, tap, withLatestFrom} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.getDataAPI();
  }

  getDataAPI(): void {
    const QUERY_ALL = gql`{
      episodes {
        results {
          name
          episode
        }
      }
      characters {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;
    this.apollo.watchQuery<DataResponse>({
      query: QUERY_ALL
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const {characters, episodes} = data;
        this.episodesSubject.next(episodes.results);
        this.charactersSubject.next(characters.results);
      })
    ).subscribe();
  }

  getCharactersByPage(pageNum: number): void {
    const QUERY_BY_PAGE = gql`{
      characters(page: ${pageNum}) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;
    this.apollo.watchQuery<any>({
      query: QUERY_BY_PAGE
    }).valueChanges.pipe(
      take(1),
      pluck('data', 'characters'),
      withLatestFrom(this.characters$),
      tap(([apiResponse, characters]) => {
        this.charactersSubject.next([...characters, ...apiResponse.results]);
      })
    ).subscribe();
  }

  filterData(valueToSearch: string): void {
    const QUERY_BY_NAME = gql`
    query ($name: String) {
      characters(filter: {name: $name}){
        info{
          count
        }
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;
    this.apollo.watchQuery<any>(
      {
        query: QUERY_BY_NAME,
        variables: {
          name: valueToSearch
        }
      }).valueChanges
      .pipe(
        take(1),
        pluck('data', 'characters'),
        tap((apiResponse) => this.charactersSubject.next([...apiResponse.results])),
        catchError(error => {
          console.log(error.message);
          this.charactersSubject.next(null);
          return of(error);
        })
      ).subscribe();
  }

  getCharactersById(id: number): Observable<any> {
    const QUERY_BY_ID = gql`
    query ($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        gender
        type
        image
      }
    }`;
    return this.apollo.watchQuery<any>(
      {
        query: QUERY_BY_ID,
        variables: {
          id
        }
      }).valueChanges
      .pipe(
        take(1),
        pluck('data', 'character'),
        catchError(error => {
          console.log(error.message);
          this.charactersSubject.next(null);
          return of(error);
        })
      );
  }
}
