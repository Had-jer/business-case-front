import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIntroduction } from './project-introduction';

describe('ProjectIntroduction', () => {
  let component: ProjectIntroduction;
  let fixture: ComponentFixture<ProjectIntroduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectIntroduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectIntroduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
