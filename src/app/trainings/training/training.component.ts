import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../shared/training.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import demodata from '../../../assets/customMessages.json';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(public trainingService:TrainingService,public toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
resetForm(form? : NgForm){
  if(form != null)
    form.reset();
  this.trainingService.selectedTraining = {
    TrainingName:'',
    TrainingID: null,
    StartDate: null,
    EndDate: null
  }
}
  onSubmit(form : NgForm){
    let sdate = new Date(this.trainingService.selectedTraining.StartDate);
    let edate = new Date(this.trainingService.selectedTraining.EndDate);
    sdate.setDate(sdate.getDate());
    edate.setDate(edate.getDate());
    var smsg : any;
    var dmsg : any;
    var diffmsg : any;
    demodata.forEach(x => {
          smsg = x.msgSuccess;
          dmsg = x.msgDate;
          diffmsg = x.msgDateDiff;
        }
    );
        
    if(sdate > edate)
    {
      this.toastr.warning(diffmsg,'Warning!');
    }
    else
    {
      let differenceInTime = edate.getTime() - sdate.getTime();
        let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));  
        differenceInDays = Math.floor(differenceInDays + 1);
        this.trainingService.Post(form.value)
        .subscribe(data =>{
        this.resetForm(form);        
        //this.toastr.success('New training added successfully and the duration between Start Date and End Date is '+ differenceInDays ,'Success');
        this.toastr.success(smsg + dmsg + differenceInDays ,'Success');
        this.trainingService.getTrainingList();
      })
    }
  }
  
}