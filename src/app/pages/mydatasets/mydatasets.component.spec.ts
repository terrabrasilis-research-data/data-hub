import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydatasetsComponent } from './mydatasets.component';

describe('MydatasetsComponent', () => {
  let component: MydatasetsComponent;
  let fixture: ComponentFixture<MydatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
