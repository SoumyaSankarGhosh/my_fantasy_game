import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  id:any = 1;
  settingForm:FormGroup;
  isSubmited:Boolean=false;
  form_setup:Boolean = false;

  constructor(private ngxSpinnerService:NgxSpinnerService,private apiService:ApiService,private FB:FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.settingDetails();
  }

  settingDetails():void{
    this.ngxSpinnerService.show();
    this.apiService.settingDetails(this.id)
    .subscribe(success=>{
      if(success.status){
        let details = success.details[0];
        this.settingForm = this.FB.group({
          'id':[details.id,[Validators.required]],
          'withdraw_money':[details.withdraw_money,[Validators.required]],
          'referrer_earning_point':[details.referrer_earning_point,[Validators.required]],
          'one_point_is_equal_to_how_much_rupees':[details.one_point_is_equal_to_how_much_rupees,[Validators.required]]
        });
        this.form_setup = true;
        this.ngxSpinnerService.hide();
      } else {

      }
    },error=>{

    })
  }

  submit():void{
    this.isSubmited = true;
    if(this.settingForm.valid){
     let formData = new FormData();
     formData.append('id',this.settingForm.value.id);
     formData.append('withdraw_money',this.settingForm.value.withdraw_money);
     formData.append('referrer_earning_point',this.settingForm.value.referrer_earning_point);
     formData.append('one_point_is_equal_to_how_much_rupees',this.settingForm.value.one_point_is_equal_to_how_much_rupees); 
     this.apiService.settingUpdate(formData)
     .subscribe((success)=>{
       if(success.status){
        this.toastr.success('Success!', success.msg);
       } else {
        this.toastr.error('Error!', success.msg);
       }
     },(error)=>{
      this.toastr.error('Error!', error.message);
     })
      
    }
  }

}
