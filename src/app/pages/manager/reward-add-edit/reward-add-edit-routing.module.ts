import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RewardAddEditComponent } from './reward-add-edit.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RewardAddEditComponent }
    ])],
    exports: [RouterModule]
})
export class RewardAddEditRoutingModule { }
