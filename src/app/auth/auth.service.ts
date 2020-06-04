import { Post } from '../models/Post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/users/";

@Injectable({providedIn:'root'})
export class AuthService{

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user : User[] = [];
  private userUpdated = new Subject<{ user: User[]; userCount: number }>();

  constructor(public http:HttpClient,private router: Router){}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(firstName:string,lastName:string,email:string,password:string,){
    const user : any ={
      firstName:firstName,
      lastName : lastName,
      email : email,
      password : password,

    }
    this.http.post(BACKEND_URL+"signup",user)
    .subscribe(responseData=>{
      this.router.navigate(["/admin/view"]);
    },error=>{
      this.authStatusListener.next(false);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{ token: string; expiresIn: number }>(BACKEND_URL+"login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(["/"]);
      }
    },error=>{
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  private setAuthTimer(duration: number) {
    //console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
  getAdmins() {

    this.http
      .get<{ message: string; users: any; maxPosts: number }>(
        BACKEND_URL+"list"
      )
      .pipe(
        map(postData => {
          return {
            users: postData.users.map(user => {
              return {
                firstName : user.firstName,
                lastName  : user.lastName,
                email : user.email,

              };
            }),
             maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.user = transformedPostData.users;
        this.userUpdated.next({
          user: [...this.user],
          userCount: transformedPostData.maxPosts
        });
      });
  }

  getAdminUpdated(){
    return this.userUpdated.asObservable();
  }

}
