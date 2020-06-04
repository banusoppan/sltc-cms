import { Component, OnInit } from '@angular/core';
//import { Post} from '../../model/Post'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { mimeType } from 'src/app/post/post-create/mime-type.validator'
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId : string;
  post : Post;
  isLoading = false;
  form : FormGroup;
  imagePreview: string;

  constructor(public postService : PostService,public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      content : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      link : new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      image: new FormControl(null, {validators: [Validators.required],asyncValidators:mimeType})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath : postData.imagePath,
            link : postData.link
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image : this.post.imagePath,
            link : this.post.link
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postService.addPost(this.form.value.title,this.form.value.content,this.form.value.image,this.form.value.link);

    }else{
      this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image,this.form.value.link);
    }
    this.form.reset();

  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
