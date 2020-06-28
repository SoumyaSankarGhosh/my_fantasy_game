import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from '../../components/users/users.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UppercasePipe } from '../../pipes/uppercase.pipe';
import { WithdrawComponent } from '../../components/withdraw/withdraw.component';

@NgModule({
  declarations: [
    UppercasePipe,
    DashboardComponent,
    UsersComponent,
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  exports: [
    DashboardComponent,
    UppercasePipe
  ]
})

export class DashboardModule { }
