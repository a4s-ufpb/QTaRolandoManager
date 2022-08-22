import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardDetailsComponent } from './event-card-details.component';

describe('EventCardDetailsComponent', () => {
  let component: EventCardDetailsComponent;
  let fixture: ComponentFixture<EventCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
