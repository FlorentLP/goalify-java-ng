import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GoalsComponent } from './pages/goals/goal.component/goals.component';
import { HabitsComponent } from './pages/habits/habits.component/habits.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [authGuard] },
  { path: 'habits', component: HabitsComponent, canActivate: [authGuard] },
];