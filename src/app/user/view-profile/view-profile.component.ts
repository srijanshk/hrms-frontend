import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../models/user-model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  islinear = false;
  disabled = true;
  user_id: String;
  public selected: any;
  public officialinfo: FormGroup;
  public personalinfo: FormGroup;
  public familyinfo: FormGroup;
  public medicalinfo: FormGroup;
  public educationinfo: FormGroup;
  public experienceinfo: FormGroup;
  public certificationAndTraininginfo: FormGroup;
  public socialmediainfo: FormGroup;
  education: any;
  experience: FormArray;
  certification: FormArray;
  data: any[];
  maxDate = new Date(2000, 0, 0);
  users: any = {};
  status = [
    { value: 'Married', viewValue: 'Married'},
    { value: 'Unmarried', viewValue: 'Unmarried'}
  ];

  blood = [
    { value: 'A+', viewValue: 'A+'},
    { value: 'B+', viewValue: 'B+'},
    { value: 'O+', viewValue: 'O+'},
    { value: 'AB+', viewValue: 'AB+'},
    { value: 'A-', viewValue: 'A-'},
    { value: 'B-', viewValue: 'B-'},
    { value: 'O-', viewValue: 'O-'},
    { value: 'AB-', viewValue: 'AB-'},
  ];

  constructor(
    public form: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public service: ProfileService
  ) {
    this.officeform();
    this.personalform();
    this.familyform();
    this.medicalform();
    this.socialform();
    this.educationinfo = this.form.group({
      education: this.form.array([])
    });
    this.experienceinfo = this.form.group({
      experience: this.form.array([])
    });
    this.certificationAndTraininginfo = this.form.group({
      certification: this.form.array([])
    });
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('_id');
    console.log(this.user_id);
      this.service.getProfileByUserId(this.user_id).subscribe((data: UserInfo[]) => {
      this.users = data;
      this.officialinfo.get('fullname').setValue(this.users.fullname);
      this.officialinfo.get('email').setValue(this.users.email);
      this.officialinfo.get('post').setValue(this.users.post);
      this.officialinfo.get('Project').setValue(this.users.Project);
      this.officialinfo.get('branch').setValue(this.users.branch);
      this.officialinfo.get('contactNo').setValue(this.users.contactNo);
      this.officialinfo.get('lineManager').setValue(this.users.lineManager);
      this.personalinfo.get('dob').setValue(this.users.dob);
      this.personalinfo.get('nationality').setValue(this.users.nationality);
      this.personalinfo.get('emergencycontact').setValue(this.users.emergencycontact);
      this.personalinfo.get('emergencycontactno').setValue(this.users.emergencycontactno);
      this.personalinfo.get('permanentaddress').setValue(this.users.permanentaddress);
      this.personalinfo.get('temporaryaddress').setValue(this.users.temporaryaddress);
      this.personalinfo.get('gender').setValue(this.users.gender);
      this.personalinfo.get('religion').setValue(this.users.religion);
      this.personalinfo.get('citizenshipno').setValue(this.users.citizenshipno);
      this.familyinfo.get('fathername').setValue(this.users.fathername);
      this.familyinfo.get('mothername').setValue(this.users.mothername);
      this.familyinfo.get('familycontactno').setValue(this.users.familycontactno);
      this.familyinfo.get('status').setValue(this.users.status);
      this.familyinfo.get('spouse').setValue(this.users.spouse);
      this.familyinfo.get('childname').setValue(this.users.childname);
      this.medicalinfo.get('bloodGroup').setValue(this.users.bloodGroup);
      this.medicalinfo.get('medicalHistory').setValue(this.users.medicalHistory);

      // tslint:disable-next-line:prefer-const
      for (let education of this.users.education) {
        this.addEducation(education);
      }
      // tslint:disable-next-line:prefer-const
      for (let experience of this.users.experience) {
        this.addExperience(experience);
      }
      // tslint:disable-next-line:prefer-const
      for (let certification of this.users.certification) {
        this.addCertification(certification);
      }
      this.socialmediainfo.get('facebook').setValue(this.users.facebook);
      this.socialmediainfo.get('twitter').setValue(this.users.twitter);
      this.socialmediainfo.get('instagram').setValue(this.users.instagram);
      this.socialmediainfo.get('linkedin').setValue(this.users.linkedin);
      this.socialmediainfo.get('github').setValue(this.users.github);
      this.socialmediainfo.get('skype').setValue(this.users.skype);
 });
}

  public officeform() {
    this.officialinfo = this.form.group({
      fullname: new FormControl({value: '', disabled: this.disabled}),
      email: new FormControl({value: '', disabled: this.disabled}),
      post: new FormControl({value: '', disabled: this.disabled}),
      Project: new FormControl({value: '', disabled: this.disabled}),
      branch: new FormControl({value: '', disabled: this.disabled}),
      contactNo: new FormControl({value: '', disabled: this.disabled}),
      lineManager: new FormControl({ value: '', disabled: this.disabled})
    });
}

  public personalform() {
    this.personalinfo = this.form.group({
      dob: new FormControl({value: '', disabled: this.disabled}),
      nationality: new FormControl({value: '', disabled: this.disabled}),
      emergencycontact: new FormControl({value: '', disabled: this.disabled}),
      permanentaddress: new FormControl({value: '', disabled: this.disabled}),
      gender: new FormControl({value: '', disabled: this.disabled}),
      religion: new FormControl({value: '', disabled: this.disabled}),
      emergencycontactno: new FormControl({value: '', disabled: this.disabled}),
      temporaryaddress: new FormControl({value: '', disabled: this.disabled}),
      citizenshipno: new FormControl({value: '', disabled: this.disabled})
    });
  }

  public familyform() {
    this.familyinfo = this.form.group({
      fathername: new FormControl({value: '', disabled: this.disabled}),
      mothername: new FormControl({value: '', disabled: this.disabled}),
      familycontactno: new FormControl({value: '', disabled: this.disabled}),
      status: new FormControl({value: '', disabled: this.disabled}),
      spouse: new FormControl({value: '', disabled: this.disabled}),
      childname: new FormControl({value: '', disabled: this.disabled}),
    });
  }

  public medicalform() {
    this.medicalinfo = this.form.group({
      bloodGroup: new FormControl({value: '', disabled: this.disabled}),
      medicalHistory: new FormControl({value: '', disabled: this.disabled})
    });
  }

  public educationform(education) {
    return new FormGroup({
      institutionName: new FormControl({value: education.institutionName, disabled: this.disabled}),
      level: new FormControl({value: education.level, disabled: this.disabled}),
      yearGraduated: new FormControl({value: education.yearGraduated, disabled: this.disabled}),
      board: new FormControl({value: education.board, disabled: this.disabled}),
      faculty: new FormControl({value: education.faculty, disabled: this.disabled}),
    });
  }

  public experienceform(experience) {
    return this.form.group({
      company: new FormControl({value: experience.company, disabled: this.disabled}),
      degination: new FormControl({value: experience.degination, disabled: this.disabled}),
      fromYear: new FormControl({value: experience.fromYear, disabled: this.disabled}),
      toYear: new FormControl({value: experience.toYear, disabled: this.disabled}),
      refrence: new FormControl({value: experience.refrence, disabled: this.disabled}),
    });
  }

  public certificationform(certification) {
    return this.form.group({
      coursetaken: new FormControl({value: certification.coursetaken, disabled: this.disabled}),
      dateofcompletion: new FormControl({value: certification.dateofcompletion, disabled: this.disabled}),
    });
  }
  public socialform() {
    this.socialmediainfo = this.form.group({
      facebook:  new FormControl({value: '', disabled: this.disabled}),
      twitter:  new FormControl({value: '', disabled: this.disabled}),
      instagram:  new FormControl({value: '', disabled: this.disabled}),
      linkedin:  new FormControl({value: '', disabled: this.disabled}),
      github:  new FormControl({value: '', disabled: this.disabled}),
      skype:   new FormControl({value: '', disabled: this.disabled})
    });
  }

  addEducation(education)  {
    this.education = this.educationinfo.get('education') as FormArray;
    this.education.push(this.educationform(education));
  }


  addExperience(experience) {
    this.experience = this.experienceinfo.get('experience') as FormArray;
    this.experience.push(this.experienceform(experience));
  }


  addCertification(certification) {
    this.certification = this.certificationAndTraininginfo.get('certification') as FormArray;
    this.certification.push(this.certificationform(certification));
  }


}
