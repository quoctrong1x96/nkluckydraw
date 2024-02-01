import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardViewListRoutingModule } from './reward-view-list-routing.module';
import { RewardViewListComponent } from './reward-view-list.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        RewardViewListRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule
    ],
    declarations: [RewardViewListComponent]
})
export class RewardViewListModule { }
