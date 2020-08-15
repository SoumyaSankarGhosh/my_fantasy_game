import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TextFormComponent implements OnInit {

  textForm:FormGroup;
  text_details:any;
  form_setup:Boolean=false;
  text_categories:any;
  preview_image:any;
  image:any;
  image_error:any=false;
  isSubmited:Boolean=false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [],
      ['insertImage','insertVideo','customClasses']
      ],
    customClasses: [
      {name: "quote",class: "quote",},
      {name: 'redText',class: 'redText'},
      {name: "titleText",class: "titleText",tag: "h1"},
    ]
  };


  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private activatedRoute:ActivatedRoute,private FB:FormBuilder,private tokenService:TokenService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.textCategory();
    if(this.activatedRoute.snapshot.params.id){
      this.textDetails(this.activatedRoute.snapshot.params.id);
    } else {
      this.textForm = this.FB.group({
        id:[''],
        text_category_id:['',[Validators.required]],
        user_id:[this.tokenService.getUserid(),[Validators.required]],
        is_trending:['',[Validators.required]],
        point:[''],
        language:['',[Validators.required]],
        content:['',[Validators.required]]
      })
      this.form_setup = true;
      this.preview_image = '../../../../assets/dist/img/default-50x50.gif';
    }
  }

  textDetails(id:any):void {
    this.apiService.textDetails(id).subscribe(success=>{
      if(success.status){
        this.text_details = success.details[0];
        this.textForm = this.FB.group({
          id:[this.text_details.id,[Validators.required]],
          text_category_id:[this.text_details.text_category_id,[Validators.required]],
          user_id:[this.text_details.user_id,[Validators.required]],
          is_trending:[this.text_details.is_trending,[Validators.required]],
          point:[this.text_details.point],
          content:[this.text_details.content,[Validators.required]],
          language:[this.text_details.language,[Validators.required]],
        })
        if(this.text_details.url){
          this.preview_image = environment.text_bg_image_url+this.text_details.url;
        } else {
          this.preview_image = '../../../../assets/dist/img/default-50x50.gif';
        }
        this.form_setup = true;
      } else {
        this.router.navigate(['/text'])
      }
    },error=>{
      console.log(error.message);
    })
  }

  textCategory():void{
    this.apiService.textCategoryList().subscribe((success)=>{
      if(success.status){
       this.text_categories = success.text_categories
      }
    },(error)=>{

    })
  }

  imageRetrieveData(data):void{
    if(data.image){
      this.preview_image = data.image.previewImageUrl;
      this.image = data.image.image;
      if(data.image.image_error){
        this.image_error = true;
      } else {
        this.image_error = false;
      }
    }
  }
  

  submit():void{
    this.isSubmited = true;
    if(this.textForm.valid){
      // console.log(this.imageForm.value)
      let formData = new FormData();
      formData.append('url',this.image);
      formData.append('text_category_id',this.textForm.value.text_category_id);
      formData.append('user_id',this.textForm.value.user_id);
      formData.append('language',this.textForm.value.language);
      formData.append('is_trending',this.textForm.value.is_trending);
      formData.append('point',this.textForm.value.point);
      formData.append('content',this.textForm.value.content);
      if(this.textForm.value.id){
        formData.append('id',this.textForm.value.id);
        this.apiService.textUpdate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/text'])
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      } else {
         this.apiService.textCreate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/text'])
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      }
    }
  }

}
