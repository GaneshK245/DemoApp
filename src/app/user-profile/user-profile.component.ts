import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent {
  userForm !: FormGroup
  selectedAge!: number;
  Address1 !: string;
  country1 !: string;
  url: any; 
  isclicked : boolean = false;
	msg = "";
  userDetails : uDetails={
    photo: '',
    fName: '',
    lName: '',
    email: '',
    phone: 0,
    age: 0,
    state: '',
    country: '',
    address: '',
    address1: '',
    address2: '',
    companyAdd1: '',
    companyAdd2: ''
  }
 
  states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
    "Lakshadweep", "Puducherry"]
  image: string = "data:image/png;base64,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"

  constructor(private fb : FormBuilder, private router : Router){

  }

  ngOnInit(){
    this.userForm=this.fb.group({
      "photo" : ['',[Validators.required]],
      "fName" : ['',[Validators.required, Validators.pattern('[A-Za-z]{1,20}'),]],
      "lName" : ['',[Validators.required]],
      "email" : ['',[Validators.required]],
      "phone" : ['',[Validators.required]],
      "age"   : ['',[Validators.required]],
      "state" : ['',[Validators.required]],
      "country" : ['',[Validators.required]],
      "address" : ['',[Validators.required]],
      "address1" : ['',[Validators.required]],
      "address2" : ['',[Validators.required]],
      "companyAdd1" : ['',[Validators.required]],
      "companyAdd2" : ['',[Validators.required]],
      })
    
  }
 
 
  updateAge(data: any) {
    this.selectedAge = data.target.value
  }
  getPhoto(data : any){
 
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(fruit);
      return;
    }
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

	selectFile(event: any) { 
		
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		
    if (event.target.files[0].size> 310*325) {
      alert("Image size should be 310x325px")
    } else {
      var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
			this.msg = "";
      this.url = reader.result; 	
		}
    }
 
	}
  onSubmit(){
      
      this.userDetails.photo=this.userForm.get('photo')?.value
      this.userDetails.fName=this.userForm.get('fName')?.value;
      this.userDetails.lName=this.userForm.get('lName')?.value;
      this.userDetails.email=this.userForm.get('email')?.value;
      this.userDetails.phone=this.userForm.get('phone')?.value;
      this.userDetails.age=this.userForm.get('age')?.value;
      this.userDetails.state=this.userForm.get('state')?.value;
      this.userDetails.country=this.userForm.get('country')?.value;
      this.userDetails.address1=this.userForm.get('address1')?.value;
      this.userDetails.address2=this.userForm.get('address2')?.value;
      this.userDetails.companyAdd1=this.userForm.get('companyAdd1')?.value;
      this.userDetails.companyAdd2=this.userForm.get('companyAdd2')?.value;
  console.log(this.userDetails);
  
  }

}

export interface Fruit {
  name: string;
}
export interface uDetails {

      "photo" : string,
      "fName" : string,
      "lName" : string,
      "email" : string,
      "phone" : number,
      "age"   : number,
      "state" :string,
      "country" : string,
      "address" :string,
      "address1" : string,
      "address2" : string,
      "companyAdd1" : string,
      "companyAdd2" : string
}

