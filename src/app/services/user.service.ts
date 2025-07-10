import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  login(user: Partial<User>) {
    return this.httpClient.post('https://atelier-de-toril.fr/' + 'auth', user, {
      headers: {
        accept: 'application/json'
      }
    });
  }

  getCurrent(token: string) {
    return this.httpClient.get('https://atelier-de-toril.fr/' + 'api/me', {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }, withCredentials: true
    });
  }
}
