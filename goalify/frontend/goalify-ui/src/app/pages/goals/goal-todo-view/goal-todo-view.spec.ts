import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTodoView } from './goal-todo-view';

describe('GoalTodoView', () => {
  let component: GoalTodoView;
  let fixture: ComponentFixture<GoalTodoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalTodoView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTodoView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
