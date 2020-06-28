import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }

  saveToken(token:any):void{
    localStorage.setItem('x-auth-token',token)
  }

  saveUserid(userId:any):void{
    localStorage.setItem('x-auth-id',userId)
  }

  removeToken():void{
    localStorage.removeItem('x-auth-token')
  }

  removeUserid():void{
    localStorage.removeItem('x-auth-id')
  }

  getToken():any{
    return localStorage.getItem('x-auth-token');
  }

  isToken():boolean{
    return localStorage.getItem('x-auth-token')?true:false;
  }

  getUserid():any{
    return localStorage.getItem('x-auth-id');
  }

  isLogin():void{
    if(this.isToken()){
      this.router.navigate(['galley']);
    }  
  }
}