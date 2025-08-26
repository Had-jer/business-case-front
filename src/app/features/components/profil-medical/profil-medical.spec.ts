import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMedical } from './profil-medical';

describe('ProfilMedical', () => {
  let component: ProfilMedical;
  let fixture: ComponentFixture<ProfilMedical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilMedical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilMedical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
