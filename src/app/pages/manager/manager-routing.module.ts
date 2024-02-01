import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./reward-view-list/reward-view-list-routing.module').then(m => m.RewardViewListRoutingModule) },
        { path: 'add', loadChildren: () => import('./reward-add-edit/reward-add-edit-routing.module').then(m => m.RewardAddEditRoutingModule) },
        { path: 'edit/:id', loadChildren: () => import('./reward-add-edit/reward-add-edit-routing.module').then(m => m.RewardAddEditRoutingModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
