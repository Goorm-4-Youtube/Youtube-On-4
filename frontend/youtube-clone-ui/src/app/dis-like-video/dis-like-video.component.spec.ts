import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisLikeVideoComponent } from './dis-like-video.component';

describe('DisLikeVideoComponent', () => {
  let component: DisLikeVideoComponent;
  let fixture: ComponentFixture<DisLikeVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisLikeVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisLikeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
