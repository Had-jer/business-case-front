import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalEvent } from './medical-event';

describe('MedicalEvent', () => {
  let component: MedicalEvent;
  let fixture: ComponentFixture<MedicalEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
