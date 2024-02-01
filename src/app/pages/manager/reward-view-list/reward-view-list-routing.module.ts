import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RewardViewListComponent } from './reward-view-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RewardViewListComponent }
    ])],
    exports: [RouterModule]
})
export class RewardViewListRoutingModule { }
