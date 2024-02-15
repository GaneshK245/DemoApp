import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
userDetails : any;
  constructor(private acr : ActivatedRoute){
    this.userDetails=this.acr.snapshot.queryParamMap.get('details')
    console.log(this.userDetails);
    
  }
}
