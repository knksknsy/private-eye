import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartCardComponent } from './dashboard-chart-card.component';

describe('DashboardChartCardComponent', () => {
  let component: DashboardChartCardComponent;
  let fixture: ComponentFixture<DashboardChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
