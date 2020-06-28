import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  isSubmitted:Boolean = false;

  constructor(private FB:FormBuilder,private apiService:ApiService,private toastr: ToastrService, private router:Router,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.FB.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  login():void {
    this.isSubmitted = true;
    if(this.loginForm.valid){
      let formData = new FormData();
      formData.append('email',this.loginForm.value.email)
      formData.append('password',this.loginForm.value.password)
      this.apiService.login(formData)
      .subscribe((success)=>{
        if(success.status){
          this.tokenService.saveToken(success.user_details.device_token)
          this.tokenService.saveUserid(success.user_details.user_id)
          this.router.navigate(['']);
        } else {
          this.toastr.error('Error!', success.msg);
        }
      },(error)=>{
        this.toastr.error('Error!', error.message);
      })
    }
  }

}
