import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormValidator } from 'src/app/models/FormValidator';
import { OrganisationService } from 'src/app/services/organisation.service';
import { ContactDetail, SocialMedia } from 'src/app/models/Organisation';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  iconPath : string;
  branches : any;
  contactDetail : ContactDetail
  socialMedia : SocialMedia
  isLoading = false;
  facebook : string;
  instagram : string;
  twitter : string;
  linkedin : string;
  youtube : string;
  email : string;
  mobile : string;


  constructor(public organisationService : OrganisationService) {


  }

  ngOnInit() {

    this.isLoading = true;
    this.organisationService.getOrganisation().subscribe(organisationData => {
      this.contactDetail = {
        email : organisationData.email,
        mobile : organisationData.mobile
      }
      this.socialMedia = {
        facebook : organisationData.facebook,
        instagram : organisationData.instagram,
        twitter : organisationData.twitter,
        linkedin : organisationData.linkedin,
        youtube : organisationData.youtube

      }
      this.branches = organisationData.branch
      this.iconPath = organisationData.iconPath
      this.isLoading = true
      this.facebook = this.socialMedia.facebook
      this.instagram = this.socialMedia.instagram
      this.linkedin = this.socialMedia.linkedin
      this.twitter = this.socialMedia.twitter
      this.youtube = this.socialMedia.youtube
      this.email = this.contactDetail.email
      this.mobile = this.contactDetail.mobile


    })




  }




}
