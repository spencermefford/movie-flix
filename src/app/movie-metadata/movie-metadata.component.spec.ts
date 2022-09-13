import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMetadataComponent } from './movie-metadata.component';

describe('MovieMetadataComponent', () => {
  let component: MovieMetadataComponent;
  let fixture: ComponentFixture<MovieMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieMetadataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
