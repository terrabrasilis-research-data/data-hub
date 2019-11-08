import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyservicesComponent } from './myservices.component';

describe('MyservicesComponent', () => {
  let component: MyservicesComponent;
  let fixture: ComponentFixture<MyservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
