import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingComponent } from './grouping.component';

describe('GroupingComponent', () => {
  let component: GroupingComponent;
  let fixture: ComponentFixture<GroupingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupingComponent]
    });
    fixture = TestBed.createComponent(GroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
