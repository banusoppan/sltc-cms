import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  private studentId : string;
  isLoading = false;
  public student : Student;

  constructor(public route:ActivatedRoute,public studentService : StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.studentId = paramMap.get("studentId");
      this.isLoading = true;
      this.studentService.getStudent(this.studentId).subscribe(studentData=>{

        this.student = {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          fullName : studentData.fullName,
          title : studentData.title,
          nic : studentData.nic,
          email : studentData.email,
          mobile : studentData.mobile,
          address1 : studentData.address1,
          address2 : studentData.address1,
          address3 : studentData.address3,
          city : studentData.city,
          district : studentData.district,
          testLanguage : studentData.testLanguage,
          awareness : studentData.awareness,
          likedMost : studentData.likedMost,
          highestEducation : studentData.highestEducation,
          uniPreparation : studentData.uniPreparation,
          userName : studentData.userName,
          password : null

        }
      })
    })
    this.isLoading = false;


  }

}
