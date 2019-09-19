import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BboxComponent } from './bbox.component';

describe('BboxComponent', () => {
  let component: BboxComponent;
  let fixture: ComponentFixture<BboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
