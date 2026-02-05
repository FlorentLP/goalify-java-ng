import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalMaintenanceView } from './goal-maintenance-view';

describe('GoalMaintenanceView', () => {
  let component: GoalMaintenanceView;
  let fixture: ComponentFixture<GoalMaintenanceView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalMaintenanceView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalMaintenanceView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
