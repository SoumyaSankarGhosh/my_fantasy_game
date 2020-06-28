import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  imageForm:FormGroup;
  image_details:any;
  form_setup:Boolean=false;
  image_categories:any;
  preview_image:any;
  image:any;
  image_error:any=false;
  isSubmited:Boolean=false;

  constructor(private apiService:ApiService, private ngxSpinnerService:NgxSpinnerService,public sanitizer: DomSanitizer,private router:Router,private activatedRoute:ActivatedRoute,private FB:FormBuilder,private tokenService:TokenService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.imageCategory();
    if(this.activatedRoute.snapshot.params.id){
      this.imageDetails(this.activatedRoute.snapshot.params.id);
    } else {
      this.imageForm = this.FB.group({
        id:[''],
        image_category_id:['',[Validators.required]],
        user_id:[this.tokenService.getUserid(),[Validators.required]],
        is_trending:['',[Validators.required]],
        point:[''],
      })
      this.form_setup = true;
      this.preview_image = '../../../../assets/dist/img/default-50x50.gif';
    }
  }

  imageDetails(id:any):void {
    this.apiService.imageDetails(id).subscribe(success=>{
      if(success.status){
        this.image_details = success.details[0];
        this.imageForm = this.FB.group({
          id:[this.image_details.id,[Validators.required]],
          image_category_id:[this.image_details.image_category_id,[Validators.required]],
          user_id:[this.image_details.user_id,[Validators.required]],
          is_trending:[this.image_details.is_trending,[Validators.required]],
          point:[this.image_details.point],
        })
        if(this.image_details.url){
          this.preview_image = environment.image_url+this.image_details.url;
        } else {
          this.preview_image = '../../../../assets/dist/img/default-50x50.gif';
        }
        this.form_setup = true;
      } else {
        this.router.navigate(['/image'])
      }
    },error=>{
      console.log(error.message);
    })
  }

  imageCategory():void{
    this.apiService.imageCategoryList().subscribe((success)=>{
      if(success.status){
       this.image_categories = success.image_categories
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
    if(this.imageForm.valid){
      // console.log(this.imageForm.value)
      let formData = new FormData();
      formData.append('url',this.image);
      formData.append('image_category_id',this.imageForm.value.image_category_id);
      formData.append('user_id',this.imageForm.value.user_id);
      formData.append('is_trending',this.imageForm.value.is_trending);
      formData.append('point',this.imageForm.value.point);
      if(this.imageForm.value.id){
        formData.append('id',this.imageForm.value.id);
        this.apiService.imageUpdate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/image'])
          } else {
            this.toastr.error('Error!', success.msg);
          }
        },error=>{
          this.toastr.error('Error!', error.message);
        })
      } else {
         this.apiService.imageCreate(formData).subscribe(success=>{
          if(success.status){
            this.toastr.success('Success!', success.msg);
            this.router.navigate(['/image'])
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
