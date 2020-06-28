import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
 {
    path: '',
    component:PrivateComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        loadChildren:() => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'video',
        loadChildren:() => import('./modules/video/video-section.module').then(m => m.VideoSectionModule)
      },
      {
        path:'image',
        loadChildren:() => import('./modules/image/image-section.module').then(m => m.ImageSectionModule)
      },
      {
        path:'text',
        loadChildren:() => import('./modules/text/text-section.module').then(m => m.TextSectionModule)
      },
      {
        path:'setting',
        component:SettingComponent
      }
    ]
 },
 {
    path: 'auth',
    component:PublicComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      }
    ]
 },
 { path:'**' , redirectTo:'/', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

