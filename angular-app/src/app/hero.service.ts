import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service'
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`), 
      catchError(this.handleError<Hero>("getHero")))
    );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation="operation", result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
