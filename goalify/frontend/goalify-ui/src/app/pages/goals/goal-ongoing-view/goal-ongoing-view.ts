import { Component, input, output, inject } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartConfiguration } from 'chart.js';
import type { GoalResponse } from '../../../goals/goals.model';

export interface Milestone {
  effortDelta: number;
  doneDay: number;
  label: string;
}

@Component({
  selector: 'app-goal-ongoing-view',
  imports: [BaseChartDirective],
  templateUrl: './goal-ongoing-view.html',
  styles: []
})
export class GoalOngoingView {
  private sanitizer = inject(DomSanitizer);

  goals = input.required<GoalResponse[]>();
  editGoal = output<GoalResponse>();
  markAsCompleted = output<GoalResponse>();

  /** Placeholder milestones for the chart (API could provide this later). */
  milestones: Milestone[] = [
    { effortDelta: 10, doneDay: 18, label: 'Prepare interview' },
    { effortDelta: 3, doneDay: 25, label: 'APPLY 1 JOBS' },
    { effortDelta: 25, doneDay: 4, label: 'INTERVIEW DONE' },
  ];

  /** Chart: efforts (Y) vs days (X). Actual progress + target line. */
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
    datasets: [
      {
        data: [0, 25, 45, 60, 85, 100, 140, 180, 220, 280],
        label: 'efforts',
        borderColor: '#352e28',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.2,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 3,
      },
      {
        data: [0, 55.5, 111, 166.6, 222, 277.7, 333.3, 388.8, 444.4, 500],
        label: 'target',
        borderColor: '#847a6e',
        borderDash: [6, 4],
        backgroundColor: 'transparent',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'days', color: '#847a6e', font: { size: 12 } },
        grid: { color: '#e2d9cc' },
        ticks: { color: '#847a6e', maxRotation: 0 },
      },
      y: {
        title: { display: true, text: 'efforts', color: '#847a6e', font: { size: 12 } },
        min: 0,
        grid: { color: '#e2d9cc' },
        ticks: { color: '#847a6e' },
      },
    },
  };

  getGoalImageUrl(goal: GoalResponse): string | SafeResourceUrl {
    if (goal.image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(goal.image);
    }
    const base = 'https://placehold.co/400x240';
    const colors: Record<string, string> = {
      HEALTH: 'b8c9ac/ffffff',
      SOCIAL: 'a8b8c8/ffffff',
      INTELLECT: 'c4b8d4/ffffff',
      AESTHETIC: 'e0b8b8/ffffff',
      MINDSET: 'e0b8a8/ffffff',
      OTHER: 'c4b8a8/ffffff',
    };
    const color = colors[goal.goalCategory] ?? 'c4b8a8/ffffff';
    return `${base}/${color}?text=${encodeURIComponent(goal.name)}`;
  }
}
