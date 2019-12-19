import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRegistrationComponent } from './user/admin-registration/admin-registration.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { PaymentComponent } from './admin-panel/payment/payment.component';
import { MortgageComponent } from './admin-panel/mortgage/mortgage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
// import { MyQuestionsComponent } from './my-questions/my-questions.component';
// import { QuestionDetailsComponent } from './question-details/question-details.component';
// import { AddQuestionsComponent } from './add-questions/add-questions.component';


const routes: Routes = [

  {path: '', redirectTo: 'user/login', pathMatch: 'full'},
  {path: 'user/registration', redirectTo: 'user/registration/user-registration', pathMatch: 'full'},
  {path: 'home/admin', redirectTo: 'home/admin/payment', pathMatch: 'full'},
  {path: 'home', redirectTo: 'home/dashboard', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'registration', component: UserRegistrationComponent,

        children: [
          {path: 'admin-registration', component: AdminRegistrationComponent },
          {path: 'user-registration', component: RegistrationComponent }
        ]
      },
      {path: 'login', component: LoginComponent}
    ]
},
{
  path:'home', component:HomeComponent, canActivate: [AuthGuard], 
  children:[
    {path:'forbiden', component:ForbidenComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'properties', component:PropertiesComponent},
    // {path:'addquestions', component:AddQuestionsComponent},
    // {path:'questions', component:MyQuestionsComponent},
    // {path:'questions/:id', component:QuestionDetailsComponent},
    {path:'properties/:id', component:PropertyDetailsComponent},
    {path:'admin', component:AdminPanelComponent, canActivate: [AuthGuard], data:{permittedRoles:['Admin']},
    children: [
        {path:'payment', component:PaymentComponent, canActivate: [AuthGuard], data:{permittedRoles:['Admin']}},
        {path: 'mortgage', component: MortgageComponent}
    ]
  }
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
