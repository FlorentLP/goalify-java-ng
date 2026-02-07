import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsManageViewComponent } from './habits-manage-view.component';

describe('HabitsManageViewComponent', () => {
  let component: HabitsManageViewComponent;
  let fixture: ComponentFixture<HabitsManageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsManageViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitsManageViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
