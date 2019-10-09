import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorieComponent } from './repositorie.component';

describe('RepositorieComponent', () => {
  let component: RepositorieComponent;
  let fixture: ComponentFixture<RepositorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
