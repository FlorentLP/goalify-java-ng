import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsMydayViewComponent } from './habits-myday-view.component';

describe('HabitsMydayViewComponent', () => {
  let component: HabitsMydayViewComponent;
  let fixture: ComponentFixture<HabitsMydayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsMydayViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitsMydayViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
