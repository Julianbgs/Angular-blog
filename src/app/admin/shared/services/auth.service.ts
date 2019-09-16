import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../components/inrefaces';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string {
    const expiredDate =  new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expiredDate) {
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    return  this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {

  }

  isAuthenticated() {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse) {
    const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }
}
