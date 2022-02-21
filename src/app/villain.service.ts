import { Injectable } from '@angular/core';
import { Villain } from './villain';
import { VILLAINS } from './mock-villains';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VillainService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getVillains(): Observable<Villain[]> {
    const villains = of(VILLAINS);
    this.messageService.add('VillainsService: fetched Villains');
    return this.http.get<Villain[]>(this.villainsUrl).pipe(
      tap((_) => this.log('fetched Villains')),
      catchError(this.handleError<Villain[]>('getVillains', []))
    );
  }

  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap((_) => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`VillainService: ${message}`);
  }

  private villainsUrl = 'api/villains';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((_) => this.log(`updated villain id=${villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addVillain(villain: Villain): Observable<Villain> {
    return this.http
      .post<Villain>(this.villainsUrl, villain, this.httpOptions)
      .pipe(
        tap((newVillain: Villain) =>
          this.log(`added villain w/ id=${newVillain.id}`)
        ),
        catchError(this.handleError<Villain>('addVillain'))
      );
  }

  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
  
    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found villains matching "${term}"`) :
         this.log(`no villains matching "${term}"`)),
      catchError(this.handleError<Villain[]>('searchVillains', []))
    );
  }
  





}
