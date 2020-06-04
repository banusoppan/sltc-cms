import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postSub : Subscription;
  users:User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource : any;

  constructor(public authService :AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAdmins();
    this.postSub = this.authService.getAdminUpdated()
      .subscribe((postsData:{user:User[],userCount:number})=>{
        this.isLoading = false;
        this.totalPosts = postsData.userCount;
        this.users = postsData.user;


      });
  }

}
