import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrbitService {
  private apiUrl = 'https://orbit-ai-ob63.onrender.com'; // FastAPI backend

  constructor(private http: HttpClient) {}

  chat(prompt:string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt });
  }
}
