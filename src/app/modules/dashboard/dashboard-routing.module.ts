import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UsersComponent } from '../../components/users/users.component';
import { WithdrawComponent } from '../../components/withdraw/withdraw.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'withdraw',
    component:WithdrawComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
