import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { authGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { UploadExcelComponent } from './pages/uploadExcel/uploadExcel.component';
import { RandomRoundComponent } from './pages/random-round/random-round.component';
import { ListRewardComponent } from './pages/list-reward/list-reward.component';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent, data: { preload: true }
  },
  {
    path: 'upload-excel',
    component: UploadExcelComponent,
    data: { preload: true }
  },
  {
    path: 'random-round',
    component: RandomRoundComponent,
    data: { preload: true }
  }, {
    path: 'list-reward',
    component: ListRewardComponent,
    data: { preload: true }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canMatch: [authGuard]
  },


  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
