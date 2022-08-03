import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideoCardComponent } from './my-video-card.component';

describe('MyVideoCardComponent', () => {
  let component: MyVideoCardComponent;
  let fixture: ComponentFixture<MyVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVideoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
