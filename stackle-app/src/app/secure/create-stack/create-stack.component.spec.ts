import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStackComponent } from './create-stack.component';

describe('CreateStackComponent', () => {
  let component: CreateStackComponent;
  let fixture: ComponentFixture<CreateStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
