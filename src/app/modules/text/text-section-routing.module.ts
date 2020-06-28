import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextCategoryComponent } from '../../components/text-category/text-category.component';
import { TextListComponent } from '../../components/text/list/text-list.component';
import { TextFormComponent } from '../../components/text/form/text-form.component';

const routes: Routes = [
  {
    path:'category',
    component:TextCategoryComponent
  },
  {
    path:'',
    component:TextListComponent
  },
  {
    path:'add',
    component:TextFormComponent
  },
  {
    path:'edit/:id',
    component:TextFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextSectionRoutingModule { }