import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableSliderTabsComponent } from './scrollable-slider-tabs.component';

describe('ScrollableSliderTabsComponent', () => {
  let component: ScrollableSliderTabsComponent;
  let fixture: ComponentFixture<ScrollableSliderTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableSliderTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableSliderTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
