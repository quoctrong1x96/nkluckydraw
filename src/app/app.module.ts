import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './services/country.service';
import { CustomerService } from './services/customer.service';
import { EventService } from './services/event.service';
import { IconService } from './services/icon.service';
import { NodeService } from './services/node.service';
import { PhotoService } from './services/photo.service';
import { ProductService } from './services/product.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  imports: [AppRoutingModule, AppLayoutModule,HttpClientModule],
  declarations: [AppComponent, NotfoundComponent,],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    fakeBackendProvider, // provider used to create fake backend
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
  ],
})
export class AppModule { }
