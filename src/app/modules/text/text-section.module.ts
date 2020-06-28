import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSectionRoutingModule } from './text-section-routing.module'
import { TextCategoryComponent } from '../../components/text-category/text-category.component';
import { VideoSectionModule } from '../video/video-section.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/text-category/modal/modal.component';
import { TextListComponent } from '../../components/text/list/text-list.component';
import { TextFormComponent } from '../../components/text/form/text-form.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    TextCategoryComponent,
    ModalComponent,
    TextListComponent,
    TextFormComponent
  ],
  imports: [ 
    CommonModule,
    TextSectionRoutingModule,
    VideoSectionModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ModalModule,
    AngularEditorModule
  ],
})
export class TextSectionModule { }
