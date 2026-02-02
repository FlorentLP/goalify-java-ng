import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import type { GoalResponse, CreateGoalRequest, GoalStatus } from '../goals/goals.model';

const GOALS_URL = `${environment.apiUrl}/goals`;

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(private http: HttpClient) {}

  getGoals(status?: GoalStatus): Observable<GoalResponse[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<GoalResponse[]>(GOALS_URL, { params });
  }

  getGoal(id: number): Observable<GoalResponse> {
    return this.http.get<GoalResponse>(`${GOALS_URL}/${id}`);
  }

  createGoal(request: CreateGoalRequest): Observable<GoalResponse> {
    return this.http.post<GoalResponse>(GOALS_URL, request);
  }

  updateGoal(id: number, request: CreateGoalRequest): Observable<GoalResponse> {
    return this.http.put<GoalResponse>(`${GOALS_URL}/${id}`, request);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${GOALS_URL}/${id}`);
  }
}