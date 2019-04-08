import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User } from '../models/adduser-model';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  isLinear = false;
  disabled = true;
  public _id: String;
  public selected: any;
  public officialinfo: FormGroup;
  public personalinfo: FormGroup;
  public familyinfo: FormGroup;
  public educationinfo: FormGroup;
  public experienceinfo: FormGroup;
  public medicalinfo: FormGroup;
  public certificationAndTraininginfo: FormGroup;
  public socialmediainfo: FormGroup;
  public imageUpload: FormGroup;
  education: FormArray;
  experience: FormArray;
  certification: FormArray;
  maxDate = new Date(2010, 0, 1);
  users: any = {};
  data: any[];
  imagePreview: any = '';
  photo: any;

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
   public snackbar: MatSnackBar,
   private profileservice: ProfileService,
   private authservice: AuthenticationService,
   private http: HttpClient,
   private environment: EnvironmentUrlService
  ) { }

  ngOnInit() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this._id = currentUser._id;
    this.officeform();
    this.uploadform();
    this.personalform();
    this.familyform();
    this.medicalform();
    this.socialform();
    this.educationinfo = this.form.group({
      education: this.form.array([this.educationform() ])
    });
    this.experienceinfo = this.form.group({
      experience: this.form.array([ this.experienceform() ])
    });
    this.certificationAndTraininginfo = this.form.group({
      certification: this.form.array([this.certificationform() ])
    });

    this.authservice.getUserbyid(this._id).subscribe((data: User[]) => {
      this.users = data;
      this.officialinfo.get('fullname').setValue(this.users[0].fullname);
      this.officialinfo.get('email').setValue(this.users[0].email);
      this.officialinfo.get('post').setValue(this.users[0].post);
      this.officialinfo.get('Project').setValue(this.users[0].Project);
      this.officialinfo.get('branch').setValue(this.users[0].branch);
      this.officialinfo.get('contactNo').setValue(this.users[0].contactNo);
      this.officialinfo.get('lineManager').setValue(this.users[0].lineManager);
    });
  }

  public uploadform() {
    this.imageUpload = this.form.group({
      image: new FormControl(null, {validators: [Validators.required]})
    })
  }


  public officeform() {
    this.officialinfo = this.form.group({
      fullname: new FormControl({ value: '', disabled: this.disabled}),
      email: new FormControl({ value: '', disabled: this.disabled}),
      post: new FormControl({ value: '', disabled: this.disabled}),
      Project: new FormControl({ value: '', disabled: this.disabled}),
      branch: new FormControl({ value: '', disabled: this.disabled}),
      contactNo: new FormControl({ value: '', disabled: this.disabled}),
      lineManager: new FormControl({ value: '', disabled: this.disabled}),
    });
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
public educationform() {
  return this.form.group({
    institutionName: '',
    level: '',
    yearGraduated: '',
    board: '',
    faculty: ''
  });
}
public experienceform() {
  return this.form.group({
    company: '',
    degination: '',
    fromYear: '',
    toYear: '',
    refrence: ''
  });
}
public certificationform() {
  return this.form.group({
    coursetaken: '',
    dateofcompletion: ''
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
addExperience(): void {
  this.experience = this.experienceinfo.get('experience') as FormArray;
  this.experience.push(this.experienceform());
}
removeExperience(j: number): void {
  this.experience.removeAt(j);
}
addEducation(): void {
  this.education = this.educationinfo.get('education') as FormArray;
  this.education.push(this.educationform());
}
removeEducation(i: number): void {

  this.education.removeAt(i);
}
addCertification(): void {
  this.certification = this.certificationAndTraininginfo.get('certification') as FormArray;
  this.certification.push(this.certificationform());
}
removeCertification(k: number): void {
  this.certification.removeAt(k);
}
onSelectFile(event:any){
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload =(event: ProgressEvent) =>{
      this.imagePreview = (<FileReader>event.target).result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.photo = event.target.files;
  }
}

image(files: File[]) {
  this.uploadAndProgress(files);
}

uploadAndProgress(files: File[]){
  var formData = new FormData();
  Array.from(files).forEach(f => formData.append('image',f))
  this.profileservice.uploadProfileImage(formData)
 .subscribe(
    data => {
      this.snackbar.open('Uploaded Successfully', 'Close', {
        duration: 2000,
        });
    },
     error => {
      this.snackbar.open('Unsuccessful', 'Close', {
        duration: 3000,
      });
    }
  )
}

submit() {

  // tslint:disable-next-line:max-line-length
  const result = Object.assign({}, this.personalinfo.value, this.familyinfo.value, this.medicalinfo.value, this.educationinfo.value, this.experienceinfo.value, this.certificationAndTraininginfo.value, this.socialmediainfo.value);
  this.profileservice.createNewProfile(result)
  .pipe(first())
  .subscribe(
    data => {
      this.router.navigate(['/dashboard']);
      this.snackbar.open('Submitted Successfully', 'Close', {
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
