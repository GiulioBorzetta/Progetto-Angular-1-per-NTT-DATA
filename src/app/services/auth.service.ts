import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comments, PeopleInfo, Posts, Todos, User } from './models/interface.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://gorest.co.in/public/v2';
  private readonly urlPost = `${this.apiUrl}/posts`;
  private readonly urlComment = `${this.apiUrl}/comments`;
  private readonly urlTodos = `${this.apiUrl}/todos`;
  private _token: string = '';

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private postSubject: BehaviorSubject<Posts[]> = new BehaviorSubject<Posts[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();
  public posts$: Observable<Posts[]> = this.postSubject.asObservable();
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private http: HttpClient) {
    this.initializeToken();
  }

  private initializeToken(): void {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string): void {
    this._token = token;
    localStorage.setItem('authToken', token);
    this._isAuthenticated.next(true);
    this.loadInitialData();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private loadInitialData(): void {
    if (this._token) {
      this.getUsers().subscribe(users => this.usersSubject.next(users));
    }
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this._token}` });
  }

  private handlePostDelete(postId: number): void {
    const updatedPosts = this.postSubject.value.filter(post => post.id !== postId);
    this.postSubject.next(updatedPosts);
  }

  createUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers }).pipe(
      map(newUser => {
        this.usersSubject.next([...this.usersSubject.value, newUser]);
        return newUser;
      })
    );
  }

  createPost(post: Posts): Observable<Posts> {
    const headers = this.getAuthHeaders();
    return this.http.post<Posts>(`${this.apiUrl}/users/${post.user_id}/posts`, post, { headers });
  }

  createComment(comment: Comments): Observable<Comments> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<Comments>(this.urlComment, comment, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      map(response => {
        this.usersSubject.next(this.usersSubject.value.filter(user => user.id !== userId));
        return response;
      })
    );
  }

  deletePost(postId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.urlPost}/${postId}`, { headers }).pipe(
      map(response => {
        this.handlePostDelete(postId);
        return response;
      })
    );
  }

  getUsers(filterParams: any = {}, perPage: number = 10): Observable<User[]> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams().set('per_page', perPage.toString());
    for (const key in filterParams) {
      if (filterParams[key]) {
        params = params.set(key, filterParams[key]);
      }
    }
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers, params });
  }

  getUserDetails(userId: string): Observable<PeopleInfo> {
    const headers = this.getAuthHeaders();
    return this.http.get<PeopleInfo>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getPostsDetails(userId: string, perPage: number = 100): Observable<Posts[]> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('per_page', perPage.toString());
    return this.http.get<Posts[]>(`${this.apiUrl}/users/${userId}/posts`, { headers, params });
  }

  getComments(postId: number): Observable<Comments[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Comments[]>(`${this.urlPost}/${postId}/comments`, { headers });
  }

  getTodosDetails(perPage: number = 100): Observable<Todos[]> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('per_page', perPage.toString());
    return this.http.get<Todos[]>(this.urlTodos, { headers, params });
  }

  getPosts(filterParams: any = {}, perPage: number = 10): Observable<Posts[]> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams().set('per_page', perPage.toString());
    for (const key in filterParams) {
      if (filterParams[key]) {
        params = params.set(key, filterParams[key]);
      }
    }
    return this.http.get<Posts[]>(this.urlPost, { headers, params });
  }

  logout(): void {
    this._token = '';
    localStorage.removeItem('authToken');
    this._isAuthenticated.next(false);
    this.usersSubject.next([]);
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }
}
