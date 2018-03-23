import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSelectionComponent } from './genre-selection.component';

describe('GenreSelectionComponent', () => {
  let component: GenreSelectionComponent;
  let fixture: ComponentFixture<GenreSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
