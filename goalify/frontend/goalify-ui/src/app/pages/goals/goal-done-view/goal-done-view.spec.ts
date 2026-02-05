import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDoneView } from './goal-done-view';

describe('GoalDoneView', () => {
  let component: GoalDoneView;
  let fixture: ComponentFixture<GoalDoneView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalDoneView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDoneView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
