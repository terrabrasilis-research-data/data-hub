import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrepositoriesComponent } from './myrepositories.component';

describe('MyrepositoriesComponent', () => {
  let component: MyrepositoriesComponent;
  let fixture: ComponentFixture<MyrepositoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrepositoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
