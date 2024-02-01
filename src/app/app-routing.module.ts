import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AppLayoutComponent } from '@app/layout/app.layout.component';
import { NotfoundComponent } from '@app/components/notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
      // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      { path: 'pages', loadChildren: () => import('@app/pages/pages.module').then(m => m.PagesModule) }
    ],
  },
  { path: 'auth', loadChildren: () => import('@app/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'landing', loadChildren: () => import('@app/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
  // {
  //   path: 'home',
  //     component: HomeComponent, data: { preload: true }
  // },
  // {
  //   path: 'upload-excel',
  //     component: UploadExcelComponent,
  //       data: { preload: true }
  // },
  // {
  //   path: 'random-round',
  //     component: RandomRoundComponent,
  //       data: { preload: true }
  // },
  // {
  //   path: 'list-reward',
  //     component: ListRewardComponent,
  //       data: { preload: true }
  // },
  // {
  //   path: 'manager', component: ManagerComponent,
  //     children: [
  //       { path: '', component: RewardViewListComponent },
  //       { path: 'add', component: RewardAddEditComponent },
  //       { path: 'edit/:id', component: RewardAddEditComponent }
  //     ]
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload'
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
