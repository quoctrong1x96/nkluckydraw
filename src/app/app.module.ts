import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { UploadExcelComponent } from './pages/uploadExcel/uploadExcel.component';
import { RandomRoundComponent } from './pages/random-round/random-round.component';
import { ListRewardComponent } from './pages/list-reward/list-reward.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule, 
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UploadExcelComponent,
    RandomRoundComponent,
    ListRewardComponent,
    HomeComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
