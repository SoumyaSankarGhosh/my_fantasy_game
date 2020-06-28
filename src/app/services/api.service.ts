import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  httpOptions:any = {
    headers: new HttpHeaders({
      //'Content-Type':  'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  videoCategoryList():Observable<any>{
    return this.http.get(`${environment.base_url}videoCategory/list`,this.httpOptions)
  }

  videoCategoryCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}videoCategory/create`,data,this.httpOptions)
  }

  videoCategoryUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}videoCategory/update`,data,this.httpOptions)
  }

  videoCategoryDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}videoCategory/delete/${id}`,this.httpOptions)
  }

  videoList():Observable<any>{
    return this.http.post(`${environment.base_url}video/list`,this.httpOptions)
  }

  videoDetails(id):Observable<any>{
    return this.http.get(`${environment.base_url}video/details/${id}`,this.httpOptions)
  }  

  videoCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}video/create`,data,this.httpOptions)
  }

  videoUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}video/update`,data,this.httpOptions)
  }

  videoDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}video/delete/${id}`,this.httpOptions)
  }

  imageCategoryUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}imageCategory/update`,data,this.httpOptions)
  }

  imageCategoryList():Observable<any>{
    return this.http.get(`${environment.base_url}imageCategory/list`,this.httpOptions)
  }

  imageCategoryCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}imageCategory/create`,data,this.httpOptions)
  }

  imageCategoryDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}imageCategory/delete/${id}`,this.httpOptions)
  }

  imageList():Observable<any>{
    return this.http.post(`${environment.base_url}image/list`,this.httpOptions)
  }

  imageDetails(id):Observable<any>{
    return this.http.get(`${environment.base_url}image/details/${id}`,this.httpOptions)
  }  

  imageCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}image/create`,data,this.httpOptions)
  }

  imageUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}image/update`,data,this.httpOptions)
  }

  imageDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}image/delete/${id}`,this.httpOptions)
  }

  textCategoryList():Observable<any>{
    return this.http.get(`${environment.base_url}textCategory/list`,this.httpOptions)
  }

  textCategoryCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}textCategory/create`,data,this.httpOptions)
  }

  textCategoryUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}textCategory/update`,data,this.httpOptions)
  }

  textCategoryDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}textCategory/delete/${id}`,this.httpOptions)
  }
  
  textList():Observable<any>{
    return this.http.post(`${environment.base_url}text/list`,this.httpOptions)
  }

  textDetails(id):Observable<any>{
    return this.http.get(`${environment.base_url}text/details/${id}`,this.httpOptions)
  }  

  textCreate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}text/create`,data,this.httpOptions)
  }

  textUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}text/update`,data,this.httpOptions)
  }

  textDelete(id):Observable<any>{
    return this.http.get(`${environment.base_url}text/delete/${id}`,this.httpOptions)
  }

  settingDetails(id):Observable<any>{
    return this.http.get(`${environment.base_url}setting/details/${id}`,this.httpOptions)
  }  

  settingUpdate(data:any):Observable<any>{
    return this.http.post(`${environment.base_url}setting/update`,data,this.httpOptions)
  }

  usersList():Observable<any>{
    return this.http.get(`${environment.base_url}user/list`,this.httpOptions)
  }

  withdrawMoneyList():Observable<any>{
    return this.http.get(`${environment.base_url}user/withdraw_money_list`,this.httpOptions)
  }

  withdrawMoneyUpdateStatus(data):Observable<any>{
    return this.http.post(`${environment.base_url}user/withdraw_money_update_status`,data)
  }

  login(data):Observable<any>{
    return this.http.post(`${environment.base_url}auth/login`,data)
  }
}
