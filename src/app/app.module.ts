import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { HeaderComponent } from './post/header/header.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/admin/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AuthInterceptor } from './auth/auth-interceptor';
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
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    RegisterationComponent,
    StudentListComponent,
    StudentViewComponent,
    OrganisationComponent,
    SocialMediaComponent,
    ContactDetailComponent,
    LogoComponent,
    BranchComponent,
    ViewAdminComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents : [ErrorComponent]

})
export class AppModule { }
