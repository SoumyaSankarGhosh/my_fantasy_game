import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VideoSectionRoutingModule } from './video-section-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VideoCategoryComponent } from '../../components/video-category/video-category.component';
import { ModalComponent } from '../../components/video-category/modal/modal.component';
import { ImageValidationDirective } from '../../directives/image-validation.directive';
import { VideoListComponent } from '../../components/video/list/video-list.component';
import { VideoFormComponent } from '../../components/video/form/video-form.component';
import { VideoValidationDirective } from '../../directives/video-validation.directive';

@NgModule({
  declarations: [
    ImageValidationDirective,
    VideoValidationDirective,
    VideoCategoryComponent,
    ModalComponent,
    VideoListComponent,
    VideoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VideoSectionRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    ImageValidationDirective
  ]
})
export class VideoSectionModule { }
