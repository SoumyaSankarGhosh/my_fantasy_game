import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSectionRoutingModule } from './image-section-routing.module'
import { ImageCategoryComponent } from '../../components/image-category/image-category.component';
import { VideoSectionModule } from '../video/video-section.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/image-category/modal/modal.component';
import { ImageListComponent } from '../../components/image/list/image-list.component';
import { ImageFormComponent } from '../../components/image/form/image-form.component';

@NgModule({
  declarations: [
    ImageCategoryComponent,
    ModalComponent,
    ImageListComponent,
    ImageFormComponent
  ],
  imports: [ 
    CommonModule,
    ImageSectionRoutingModule,
    VideoSectionModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ModalModule
  ],
})
export class ImageSectionModule { }
