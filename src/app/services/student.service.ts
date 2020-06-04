import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.model';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/students/";

@Injectable({providedIn:'root'})
export class StudentService{
  private students : Student[] = [];
  private studentUpdated = new Subject<{ students: Student[]; studentCount: number }>();

  constructor(private http:HttpClient,private router :Router){}


  addStudent(firstName:string,lastName:string,
    fullName:string,title:string,nic:string,
    email:string,mobile:string,address1:string,address2:string,address3:string,city:string,
    district:string,testLanguage:string,awareness:string,likedMost:string,highestEducation:string,uniPreparation:boolean,
    userName:string,password:string){
    const studentData : Student ={

      firstName: firstName,
      lastName: lastName,
      fullName : fullName,
      title : title,
      nic : nic,
      email : email,
      mobile : mobile,
      address1 : address1,
      address2 : address2,
      address3 : address3,
      city : city,
      district : district,
      testLanguage : testLanguage,
      awareness : awareness,
      likedMost : likedMost,
      highestEducation : highestEducation,
      uniPreparation : uniPreparation,
      userName : userName,
      password : password


     }


    this.http.post(BACKEND_URL+'register',studentData)
    .subscribe((responseData)=>{
      this.router.navigate(["/student/list"]);

    });


  }
  getStudents() {

    this.http
      .get<{ message: string; students: any; maxPosts: number }>(
        BACKEND_URL+"list"
      )
      .pipe(
        map(postData => {
          return {
            students: postData.students.map(student => {
              return {
                firstName: student.firstName,
                lastName: student.lastName,
                id: student._id,
                email: student.email,
                mobile : student.mobile
              };
            }),
             maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.students = transformedPostData.students;
        this.studentUpdated.next({
          students: [...this.students],
          studentCount: transformedPostData.maxPosts
        });
      });
  }
  getStudentUpdated(){
    return this.studentUpdated.asObservable();
  }

  getStudent(id: string) {
    return this.http.get<Student>(
      BACKEND_URL + id
    );
  }
}
