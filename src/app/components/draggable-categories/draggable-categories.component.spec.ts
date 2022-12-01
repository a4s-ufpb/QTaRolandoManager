import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableCategoriesComponent } from './draggable-categories.component';

describe('DraggableCategoriesComponent', () => {
  let component: DraggableCategoriesComponent;
  let fixture: ComponentFixture<DraggableCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
