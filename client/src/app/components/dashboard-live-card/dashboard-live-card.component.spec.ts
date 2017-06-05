import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLiveCardComponent } from './dashboard-live-card.component';

describe('DashboardLiveCardComponent', () => {
  let component: DashboardLiveCardComponent;
  let fixture: ComponentFixture<DashboardLiveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLiveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
