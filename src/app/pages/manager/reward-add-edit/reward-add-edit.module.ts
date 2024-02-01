import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardAddEditRoutingModule } from './reward-add-edit-routing.module';
import { RewardAddEditComponent } from './reward-add-edit.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RewardAddEditRoutingModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    declarations: [RewardAddEditComponent]
})
export class LoginModule { }
