import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsMyweekViewComponent } from './habits-myweek-view.component';

describe('HabitsMyweekViewComponent', () => {
  let component: HabitsMyweekViewComponent;
  let fixture: ComponentFixture<HabitsMyweekViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsMyweekViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitsMyweekViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
