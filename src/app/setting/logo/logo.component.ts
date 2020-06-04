import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/post/post-create/mime-type.validator';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  private postId : string;
  isLoading = false;
  form : FormGroup;
  imagePreview: string;

  constructor(public organisationService : OrganisationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, {validators: [Validators.required],asyncValidators:mimeType})
    });
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
  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.organisationService.changeLogo(this.form.value.image);

  }

}
