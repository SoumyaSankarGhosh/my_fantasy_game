import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageCategoryComponent } from '../../components/image-category/image-category.component';
import { ImageListComponent } from '../../components/image/list/image-list.component';
import { ImageFormComponent } from '../../components/image/form/image-form.component';

const routes: Routes = [
  {
    path:'category',
    component:ImageCategoryComponent
  },
  {
    path:'',
    component:ImageListComponent
  },
  {
    path:'add',
    component:ImageFormComponent
  },
  {
    path:'edit/:id',
    component:ImageFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageSectionRoutingModule { }