import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// modules
import { AppRoutingModule } from './app-routing.module';

// ngx-bootstrap modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

// components
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardLiveCardComponent } from './components/dashboard-live-card/dashboard-live-card.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// services
import { EnvironmentDataService } from './services/environment-data.service';
import { PIService } from './services/pi.service';

// pipes
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuComponent,
    DashboardLiveCardComponent,
    HomeViewComponent,
    MapComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EnvironmentDataService, PIService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
