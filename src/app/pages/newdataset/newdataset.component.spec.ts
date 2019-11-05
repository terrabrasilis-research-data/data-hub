import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdatasetComponent } from './newdataset.component';

describe('NewdatasetComponent', () => {
  let component: NewdatasetComponent;
  let fixture: ComponentFixture<NewdatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
