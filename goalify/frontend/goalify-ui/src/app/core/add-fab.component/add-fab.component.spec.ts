import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFabComponent } from './add-fab.component';

describe('AddFabComponent', () => {
  let component: AddFabComponent;
  let fixture: ComponentFixture<AddFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
