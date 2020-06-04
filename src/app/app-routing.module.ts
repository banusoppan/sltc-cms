import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterationComponent } from './student/registeration/registeration.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentViewComponent } from './student/student-view/student-view.component';
import { OrganisationComponent } from './setting/organisation/organisation.component';
import { SocialMediaComponent } from './setting/social-media/social-media.component';
import { ContactDetailComponent } from './setting/contact-detail/contact-detail.component';
import { LogoComponent } from './setting/logo/logo.component';
import { BranchComponent } from './setting/branch/branch.component';
import { ViewAdminComponent } from './admin/view-admin/view-admin.component';



const routes: Routes = [
  {path : '', component : PostListComponent,canActivate: [AuthGuard]},
  {path : 'create' , component : PostCreateComponent ,canActivate: [AuthGuard]},
  {path : 'edit/:postId' , component: PostCreateComponent ,canActivate: [AuthGuard]},
  {path : 'login', component:LoginComponent },
  {path : 'signup',component:SignupComponent,canActivate: [AuthGuard]},
  {path : 'admin/view',component:ViewAdminComponent,canActivate: [AuthGuard]},
  {path : 'student/register',component:RegisterationComponent,canActivate: [AuthGuard]},
  {path : 'student/list',component:StudentListComponent,canActivate: [AuthGuard]},
  {path : 'student/view/:studentId',component:StudentViewComponent,canActivate: [AuthGuard]},
  {path : 'organisation',component:OrganisationComponent,canActivate: [AuthGuard]},
  {path : 'organisation/social-media',component:SocialMediaComponent,canActivate: [AuthGuard]},
  {path : 'organisation/contact-detail',component:ContactDetailComponent,canActivate: [AuthGuard]},
  {path : 'organisation/change-logo',component:LogoComponent,canActivate: [AuthGuard]},
  {path : 'organisation/add-branch',component:BranchComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
