import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrepositorieComponent } from './newrepositorie.component';

describe('NewrepositorieComponent', () => {
  let component: NewrepositorieComponent;
  let fixture: ComponentFixture<NewrepositorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrepositorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrepositorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
