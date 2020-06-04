
import { SocialMedia, ContactDetail } from '../models/Organisation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.model';
import { Post } from '../models/Post';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/organisations/";

@Injectable({providedIn:'root'})
export class OrganisationService{
  private posts : Post[] = [];

  constructor(private http:HttpClient,private router :Router){}

  addSocailMedia(facebook:string,instagram:string,twitter:string,linkedin:string,youtube:string){
    const OrganisationData : SocialMedia = {
      facebook : facebook,
      twitter : twitter,
      instagram : instagram,
      linkedin : linkedin,
      youtube : youtube


    }

    this.http.post<{message:string,result:any}>(BACKEND_URL+'social-media',OrganisationData)
    .subscribe((responseData)=>{
      this.router.navigate(["/organisation"]);

    });
  }

  addContactDetail(email:string,mobile:string){
    const OrganisationData : ContactDetail ={
      email : email,
      mobile : mobile
    }
    this.http.post<{message:string,result:any}>(BACKEND_URL+'contact-detail',OrganisationData)
    .subscribe((responseData)=>{
      this.router.navigate(["/organisation"]);

    });
  }
  changeLogo(image:File){
    const postData = new FormData();

    postData.append("image",image,"logo");


    this.http.post<{message:string}>(BACKEND_URL+'change-logo',postData)
    .subscribe((responseData)=>{
      this.router.navigate(["/organisation"]);

    });


  }

  addBranch(branch:any){
    const organisationData :any ={
      branch : branch
    }
    this.http.post<{message:string}>(BACKEND_URL+'add-branch',organisationData)
    .subscribe((responseData)=>{
      this.router.navigate(["/organisation"]);

    });

  }
  getOrganisation(){
    return this.http.get<any>(
      BACKEND_URL
    );

  }




}
