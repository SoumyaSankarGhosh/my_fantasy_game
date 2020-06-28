import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCategoryComponent } from '../../components/video-category/video-category.component';
import { VideoListComponent } from '../../components/video/list/video-list.component';
import { VideoFormComponent } from '../../components/video/form/video-form.component';

const routes: Routes = [
  {
    path:'category',
    component:VideoCategoryComponent
  },
  {
    path:'',
    component:VideoListComponent
  },
  {
    path:'add',
    component:VideoFormComponent
  },
  {
    path:'edit/:id',
    component:VideoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoSectionRoutingModule { }
