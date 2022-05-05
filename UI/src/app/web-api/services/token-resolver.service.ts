import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, finalize, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AwsCognitoService } from './aws-cognito.service';


@Injectable()
export class TokenResolverService implements Resolve<any> {

  constructor(private location: Location,
              private awsCognitoService: AwsCognitoService,
              private router: Router) { }

  public resolve(): Observable<any | null> {

    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const code:any = urlParams.get('code');
console.log({code});
    if (!code) {
      return of(null);
    }

    return this.getTokenDetailsFromCognito(code).pipe(
      finalize(() => {
        this.location.replaceState(window.location.pathname);
      })
    );
  }

  private getTokenDetailsFromCognito(code: string): Observable<any | null> {
    return this.awsCognitoService.getTokenDetailsFromCognito(code).pipe(
      switchMap((response: any) => {
        console.log('Response: ', response);

        localStorage.setItem('token', response.access_token);

        if (response) {
          this.router.navigate(['predicted']);
        }

        return of(response);
      }),
      catchError ((error) => {
        return error;
      })
    );
  }
}
