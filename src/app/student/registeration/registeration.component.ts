import { Component, OnInit } from '@angular/core';
//import { Post} from '../../model/Post'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { mimeType } from 'src/app/post/post-create/mime-type.validator'
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  isLoading = false;
  registerForm : FormGroup;
  uniPrepation = false;

  constructor(public studentService:StudentService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName : new FormControl(null,{
       validators:[Validators.required,Validators.minLength(3)]
      }),
      lastName : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      fullName : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      title : new FormControl(null,{
        validators:[Validators.required]
      }),
      nic : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(10)]
      }),
      email : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      mobile : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(10)]
      }),
      address1 : new FormControl(null,{
      }),
      address2 : new FormControl(null,{
      }),
      address3 : new FormControl(null,{
      }),
      district : new FormControl(null,{
        validators:[Validators.required]
      }),
      testLanguage : new FormControl(null,{
        validators:[Validators.required]
      }),
      awareness : new FormControl(null,{
        validators:[Validators.required]
      }),
      likedMost: new FormControl(null,{
        validators:[Validators.required]
      }),
      highestEducation : new FormControl(null,{
        validators:[Validators.required]
      }),
      uniPreparation: new FormControl(null,{
        validators:[Validators.required]
      }),
      userName : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      password : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
     // image: new FormControl(null, {validators: [Validators.required],asyncValidators:mimeType})
    });
  }
  onSavePost(){
    if(this.registerForm.invalid){
      return ;

    }
    if(this.registerForm.value.uniPreparation=="yes"){
      this.uniPrepation = true;

    }
    this.studentService.addStudent(this.registerForm.value.firstName,this.registerForm.value.lastName,
      this.registerForm.value.fullName,this.registerForm.value.title,this.registerForm.value.nic,
      this.registerForm.value.email,this.registerForm.value.mobile,this.registerForm.value.address1,
      this.registerForm.value.address2,this.registerForm.value.address3,this.registerForm.value.city,
      this.registerForm.value.district,this.registerForm.value.testLanguage,this.registerForm.value.awareness,
      this.registerForm.value.likedMost,this.registerForm.value.highestEducation,this.uniPrepation,
      this.registerForm.value.userName,this.registerForm.value.password);
  }

}
