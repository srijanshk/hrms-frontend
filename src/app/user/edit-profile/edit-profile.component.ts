import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UserInfo } from '../models/user-model';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  islinear = false;
  disabled = true;
  public role: String;
  _id: String;
  public selected: any;
  public officialinfo: FormGroup;
  public personalinfo: FormGroup;
  public familyinfo: FormGroup;
  public educationinfo: FormGroup;
  public experienceinfo: FormGroup;
  public medicalinfo: FormGroup;
  public certificationAndTraininginfo: FormGroup;
  public socialmediainfo: FormGroup;
  education: any;
  experience: FormArray;
  certification: FormArray;
  data: any[];
  maxDate = new Date(2000, 0, 0);
  users: any = {};
  statuss = [
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
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfileService,
    public snackbar: MatSnackBar
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

this._id = this.route.snapshot.paramMap.get('_id');
      this.service.getProfileByUserId(this._id).subscribe((data: UserInfo[]) => {
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.role = currentUser.role;
    if (this.role === 'manager') {
    this.officialinfo = this.form.group({
      fullname: new FormControl({value: '', disabled: this.disabled}),
      email: new FormControl({value: '', disabled: this.disabled}),
      post: new FormControl({value: '', disabled: this.disabled}),
      Project: new FormControl({value: ''}),
      branch: new FormControl({value: '', disabled: this.disabled}),
      contactNo: new FormControl({value: '', disabled: this.disabled}),
      lineManager: new FormControl({value: '', disabled: this.disabled}),
    });
  } else {
  this.officialinfo = this.form.group({
    fullname: new FormControl({value: '', disabled: this.disabled}),
    email: new FormControl({value: '', disabled: this.disabled}),
    post: new FormControl({value: '', disabled: this.disabled}),
    Project: new FormControl({value: '', disabled: this.disabled}),
    branch: new FormControl({value: '', disabled: this.disabled}),
    contactNo: new FormControl({value: '', disabled: this.disabled}),
    lineManager: new FormControl({value: '', disabled: this.disabled}),
  });
  }
  }
  public personalform() {
    this.personalinfo = this.form.group({
      dob: [''],
      nationality: [''],
      emergencycontact: [''],
      emergencycontactno: [''],
      permanentaddress: [''],
      temporaryaddress: [''],
      gender: [''],
      religion: [''],
      citizenshipno: [''],
    });
  }
  public familyform() {
    this.familyinfo = this.form.group({
      fathername: [''],
      mothername: [''],
      familycontactno: [''],
      status: [''],
      spouse: [''],
      childname: ['']
    });
  }
  public medicalform() {
    this.medicalinfo = this.form.group({
      bloodGroup: [''],
      medicalHistory: ['']
    });
  }
public educationform(education) {
  if (!education) {
    education = {
      institutionName: '',
    level: '',
    yearGraduated: '',
    board: '',
    faculty: ''
    };
  }
  return new FormGroup({
    institutionName: new FormControl(education.institutionName),
    level: new FormControl(education.level),
    yearGraduated: new FormControl(education.yearGraduated),
    board: new FormControl(education.board),
    faculty: new FormControl(education.faculty),
  });
}
public experienceform(experience) {
  if (!experience) {
    experience = {
      company: '',
      degination: '',
      fromYear: '',
      toYear: '',
      refrence: ''
    };
  }
  return this.form.group({
    company: new FormControl(experience.company),
    degination: new FormControl(experience.degination),
    fromYear: new FormControl(experience.fromYear),
    toYear: new FormControl(experience.toYear),
    refrence: new FormControl(experience.refrence),
  });
}
public certificationform(certification) {
  if (!certification) {
    certification = {
      coursetaken: '',
      dateofcompletion: ''
    };
  }
  return this.form.group({
    coursetaken: new FormControl(certification.coursetaken),
    dateofcompletion: new FormControl(certification.dateofcompletion),
  });
}
public socialform() {
  this.socialmediainfo = this.form.group({
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedin: [''],
    github: [''],
    skype:  ['']
  });
}

addExperience(experience) {
  this.experience = this.experienceinfo.get('experience') as FormArray;
  this.experience.push(this.experienceform(experience));
}
removeExperience(j: number): void {
  this.experience.removeAt(j);
}
addEducation(education)  {
  // tslint:disable-next-line:prefer-const

  this.education = this.educationinfo.get('education') as FormArray;
  this.education.push(this.educationform(education));
}
removeEducation(i: number): void {

  this.education.removeAt(i);
}
addCertification(certification) {
  this.certification = this.certificationAndTraininginfo.get('certification') as FormArray;
  this.certification.push(this.certificationform(certification));
}
removeCertification(k: number): void {
  this.certification.removeAt(k);
}

updateProfile() {
  this._id = this.route.snapshot.paramMap.get('_id');
  // tslint:disable-next-line:max-line-length
  const result = Object.assign({}, this.officialinfo.value, this.personalinfo.value, this.familyinfo.value, this.medicalinfo.value, this.educationinfo.value, this.experienceinfo.value, this.certificationAndTraininginfo.value, this.socialmediainfo.value);
  this.service.updateProfile(this._id, result)
  .pipe(first())
  .subscribe(
    data => {
      console.log(this._id);
      this.router.navigate([`/dashboard/user/profile/view/${this._id}`]);
      this.snackbar.open('Updated Successfully', 'Close', {
        duration: 2000,
        });
    },
    error => {
      this.snackbar.open('Unsuccessful', 'Close', {
        duration: 3000,
      });
    }
  );

}

}
