import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path : '', redirectTo:'homePage',pathMatch:'full'},
{ path: "homePage", component :HomePageComponent},
{ path : "userProfile", component : UserProfileComponent},
{ path : "userList" ,component : UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
