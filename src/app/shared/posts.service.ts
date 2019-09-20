import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../admin/shared/components/inrefaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse} from './interface';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
   return  this.http.post(`${environment.dbUrl}/posts.json`, post)
     .pipe(map((response: FbResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
     }));
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.dbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
         return  Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }));
      }));
  }
}
