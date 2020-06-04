import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../../models/Post';
import { PostService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit ,OnDestroy{
  //posts = [
    //{title : "First Post",content: "First Post Content"},
    //{title : "Second Post",content: "Second Post Content"},
    //{title : "Third Post",content: "Third Post Content"}
  //];
  posts:Post[] = [];
  private postSub : Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];

  constructor(public postService : PostService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.postService.getPostUpdated()
      .subscribe((postsData:{posts:Post[],postCount:number})=>{
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;

      });
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
  onDelete(postId:string){
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    });

  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

}
