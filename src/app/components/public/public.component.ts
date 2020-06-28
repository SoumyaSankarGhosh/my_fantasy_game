import { Component,OnInit, ViewEncapsulation } from '@angular/core'

@Component({
    selector:'app-public',
    templateUrl:'./public.component.html',
    styleUrls: ['./public.component.css']
})

export class PublicComponent implements OnInit {

    title:any ='Sign in to start your session';

    ngOnInit(){
        
    }
}


