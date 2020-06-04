import { Component, OnInit } from '@angular/core';
//import { Organisation } from 'src/app/models/Organisation';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/posts.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import { SocialMedia } from 'src/app/models/Organisation';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
  //organisation : Organisation;
  isLoading = false;
  form : FormGroup;
  socialMedia : SocialMedia;


  constructor(public organisationService : OrganisationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      facebook : new FormControl(null,{

      }),
      twitter : new FormControl(null,{

      }),
      instagram : new FormControl(null,{

      }),
      linkedin : new FormControl(null,{

      }),
      youtube : new FormControl(null,{

      }),
    });

    this.isLoading = true;
    this.organisationService.getOrganisation().subscribe(organisationData => {
      this.isLoading = false;
      this.socialMedia = {
        facebook : organisationData.facebook,
        instagram : organisationData.instagram,
        twitter : organisationData.twitter,
        linkedin : organisationData.linkedin,
        youtube : organisationData.youtube
      };
      this.form.setValue({
        facebook: this.socialMedia.facebook,
        instagram: this.socialMedia.instagram,
        twitter : this.socialMedia.twitter,
        linkedin : this.socialMedia.linkedin,
        youtube : this.socialMedia.youtube
      });
    });
  }

  onSave(){
    if(this.form.invalid){
      return;
    }
    this.organisationService.addSocailMedia(this.form.value.facebook,this.form.value.instagram,
      this.form.value.twitter,this.form.value.linkedin,this.form.value.youtube);

  }

}
