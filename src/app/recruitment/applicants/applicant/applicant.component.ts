import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormServices } from '../../../shared/services/form';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ApplicantService } from '../../services/applicant.service';
import { PositionService } from '../../services/position.service';
import { InterviewerService } from '../../services/interviewer.service';
import { first } from 'rxjs/operators';
import { EnvironmentUrlService } from '../../../shared/services/environment-url.service';


@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  public loading = false;
  public submitted = false;
  positionList: any;
  interviewerList: any;
  formErrors = {
    name : '',
    email: '',
    experience: '',
    address: '',
    citizenship: '',
    documents: '',
    remarks: '',
    photo: '',
  };
  // public file_srcs: string[] = [];
  // public debug_size_before: string[] = [];
  // public debug_size_after: string[] = [];
  // public addPhoto: any;
  fileToUpload: File = null;
  photoToUpload: File = null;

  constructor(
    public form: FormBuilder,
    public formService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    public service: ApplicantService,
    private dialogRef:MatDialogRef<ApplicantComponent>,
    public servicePosition: PositionService,
    public serviceInterviewer: InterviewerService,
    private changeDetectorRef: ChangeDetectorRef,
    private environmentUrlService: EnvironmentUrlService,
  ) {}
  public uploadUrl: string;

   getPositionList(){
    this.servicePosition.getPositions()
    .subscribe(data => {
    this.positionList= data; 
    });
  }

  getInterviewerList(){
    this.serviceInterviewer.getInterviewers()
    .subscribe(data => {
        this.interviewerList = data;
    });
  }
 
  onSubmit() {
    debugger;
    this.submitted = true;
    this.formService.markFormGroupTouched(this.service.form);
    if (this.service.form.valid) {
      if(!this.service.form.get('id').value)
      {
       this.service.postFileApplicant(this.photoToUpload);
      debugger;
       this.service.postFileApplicant(this.fileToUpload); 
       this.service.postApplicant(this.service.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackbar.open('Applicant has been Added', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.loading = false;
          this.snackbar.open('Unsuccessful', 'Close', {
            duration: 3000,
          });
        },
        
      );
      }
      else{
        this.service.putApplicant(this.service.form.get('id').value, this.service.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.snackbar.open('Applicant has been Updated', 'Close', {
              duration: 3000,
            });
          },
          error => {
            this.loading = false;
            this.snackbar.open('Unsuccessful', 'Close', {
              duration: 3000,
            });
          },
          
        );
      }
      this.closeDialog();
    } 
    else {
      this.formErrors = this.formService.validateForm(this.service.form, this.formErrors, false);
    }
    
  }

  closeDialog = function() {
    this.dialogRef.close();
  };

  clearForm = function() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  };

// initiate component
  ngOnInit() {
    this.getPositionList();
    this.getInterviewerList();
    this.uploadUrl = this.environmentUrlService.uploadUrl;
      }

      keyPress(event: any)
      {
        const pattern = '/[0-9\+\-\]/';

      }

  //     fileChange(input){
  //       //debugger;
  //       this.readFiles(input.files);
  //     }

  //     readFile(file, reader, callback){
  //       reader.onload = () =>{
  //         callback(reader.result);
  //         //this.service.form.setValue({
  //          // photo: reader.result
  //         //});
  //         this.addPhoto = reader.result;
  //       }
  //       reader.readAsDataURL(file);
  //     }

  //     readFiles(files, index=0){
  //       let reader = new FileReader();
  //       if(index in  files){
  //         this.readFile(files[index], reader, (result) => {
  //           var img = document.createElement("img");
  //           img.src= result;
  //           this.resize(img,250,250,(resized_jpeg, before, after) =>{
  //             this.debug_size_before.push(before);
  //             this.debug_size_after.push(after);
  //             this.file_srcs.push(resized_jpeg);
  //            // this.readFiles(files, index+1);
  //           });
  //         });
  //       }
  //       else{
  //         this.changeDetectorRef.detectChanges();
  //       }
  //     }
  //     resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback)
  //     {
  //       return img.onload = () => {
  //         var width = img.width;
  //         var height = img.height;
  //         if(width > height){
  //           if(width > MAX_WIDTH){
  //             height *= MAX_WIDTH / width;
  //             width = MAX_WIDTH;
  //           }
  //         }
  //         else{
  //           if(height > MAX_HEIGHT){
  //             width *= MAX_HEIGHT/height;
  //             height = MAX_HEIGHT;
  //           }
  //         }
  //     var canvas = document.createElement("canvas");
  //     canvas.width = width;
  //     canvas.height = height;
  //     var ctx = canvas.getContext("2d");
  //     ctx.drawImage(img,0,0,width,height);
  //     var dataUrl = canvas.toDataURL('image/jpeg');
  //     callback(dataUrl, img.src.length, dataUrl.length);
  //   }
  // }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  handlePhotoInput(files: FileList) {
    this.photoToUpload = files.item(0);
  }
}
