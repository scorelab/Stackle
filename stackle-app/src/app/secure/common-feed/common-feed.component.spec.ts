import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFeedComponent } from './common-feed.component';

describe('CommonFeedComponent', () => {
  let component: CommonFeedComponent;
  let fixture: ComponentFixture<CommonFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
