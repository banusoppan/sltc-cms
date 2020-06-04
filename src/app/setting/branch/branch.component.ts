import { Component, OnInit, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/models/FormValidator';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  branchForm: FormGroup
  loading:boolean
  branches:[]
  public fb : FormBuilder

  constructor(injector : Injector,public organisationService : OrganisationService) {
    this.fb = injector.get(FormBuilder)

  }

  ngOnInit() {

    this.branchForm = FormValidator.branchForm(this.fb)
    this.loading = true;
    this.organisationService.getOrganisation().subscribe(organisationData => {
      this.loading = false;
      this.branches = organisationData.branch
      this.branchForm = FormValidator.branchForm(this.fb)
      if(this.branches){
        this.branchForm = new FormGroup({
            'branches' : new FormArray(this.branches.map(item =>{
                const group = FormValidator.addEdu(this.fb);
                group.patchValue(item);
                return group;
            }))
        })
    }


    });

  }


  // get studiesData { return this.educationalForm.get('Data');}
  addEdubutton():void{
    (<FormArray>this.branchForm.get('branches')).push(FormValidator.addEdu(this.fb));
  }

  removeSkillButtonClick(index):void{
    (<FormArray>this.branchForm.get('branches')).removeAt(index);
  }
  onSubmit(){
    this.organisationService.addBranch(this.branchForm.value.branches);

  }

}
