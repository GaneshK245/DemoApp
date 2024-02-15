import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserRegistrationComponent,
    UserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
