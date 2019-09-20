import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TintervalComponent } from './tinterval.component';

describe('TintervalComponent', () => {
  let component: TintervalComponent;
  let fixture: ComponentFixture<TintervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TintervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TintervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
