import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalOngoingView } from './goal-ongoing-view';

describe('GoalOngoingView', () => {
  let component: GoalOngoingView;
  let fixture: ComponentFixture<GoalOngoingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalOngoingView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalOngoingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
