import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OrganisationService } from 'src/app/services/organisation.service';
import { ContactDetail } from 'src/app/models/Organisation';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  isLoading = false;
  form : FormGroup;
  contactDetail : ContactDetail

  constructor(public organisationService : OrganisationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null,{

      }),
      mobile : new FormControl(null,{

      }),

    });
    this.isLoading = true;
    this.organisationService.getOrganisation().subscribe(organisationData => {
      this.isLoading = false;
      this.contactDetail = {
        email : organisationData.email,
        mobile : organisationData.mobile,


      };
      this.form.setValue({
        email: this.contactDetail.email,
        mobile: this.contactDetail.mobile,

      });
    });
  }
  onSave(){
    if(this.form.invalid){
      return;
    }
    this.organisationService.addContactDetail(this.form.value.email,this.form.value.mobile);


  }

}
