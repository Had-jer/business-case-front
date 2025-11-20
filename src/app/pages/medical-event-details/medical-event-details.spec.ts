import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalEventDetails } from './medical-event-details';

describe('MedicalEventDetails', () => {
  let component: MedicalEventDetails;
  let fixture: ComponentFixture<MedicalEventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalEventDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalEventDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
