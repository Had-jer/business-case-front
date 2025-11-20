import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinscrirePage } from './sinscrire';

describe('SinscrirePage', () => {
  let component: SinscrirePage;
  let fixture: ComponentFixture<SinscrirePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinscrirePage]  // Composant standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinscrirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
