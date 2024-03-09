import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableComponent } from './resizable.component';

describe('ResazibleComponent', () => {
  let component: ResizableComponent;
  let fixture: ComponentFixture<ResizableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResizableComponent]
    });
    fixture = TestBed.createComponent(ResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
