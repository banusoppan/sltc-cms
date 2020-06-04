import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/Student';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postSub : Subscription;
  students:Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobile','action'];
  dataSource = ELEMENT_DATA;

  constructor(public studentService :StudentService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudents();
    this.postSub = this.studentService.getStudentUpdated()
      .subscribe((postsData:{students:Student[],studentCount:number})=>{
        this.isLoading = false;
        this.totalPosts = postsData.studentCount;
        this.students = postsData.students;

      });

  }
  onChangePage(pageData: PageEvent) {

  }
  viewStudent(id:string){

  }

}
