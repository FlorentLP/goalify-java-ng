import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CreateHabitRequest, HabitResponse } from './habits.model';

const HABITS_URL = `${environment.apiUrl}/habits`;

@Injectable({ providedIn: 'root' })
export class HabitsService {
  constructor(private http: HttpClient) {}

  getHabits(): Observable<HabitResponse[]> {
    let params = new HttpParams();
    return this.http.get<HabitResponse[]>(HABITS_URL, { params });
  }

  getHabit(id: number): Observable<HabitResponse> {
    return this.http.get<HabitResponse>(`${HABITS_URL}/${id}`);
  }

  createHabit(request: CreateHabitRequest): Observable<HabitResponse> {
    return this.http.post<HabitResponse>(HABITS_URL, request);
  }

  updateHabit(id: number, request: CreateHabitRequest): Observable<HabitResponse> {
    return this.http.put<HabitResponse>(`${HABITS_URL}/${id}`, request);
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${HABITS_URL}/${id}`);
  }
}