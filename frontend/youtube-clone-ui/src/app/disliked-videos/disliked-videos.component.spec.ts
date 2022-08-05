import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislikedVideosComponent } from './disliked-videos.component';

describe('DislikedVideosComponent', () => {
  let component: DislikedVideosComponent;
  let fixture: ComponentFixture<DislikedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislikedVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DislikedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
