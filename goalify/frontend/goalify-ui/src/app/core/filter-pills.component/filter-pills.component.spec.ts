import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPillsComponent } from './filter-pills.component';

describe('FilterPillsComponent', () => {
  let component: FilterPillsComponent;
  let fixture: ComponentFixture<FilterPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPillsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
