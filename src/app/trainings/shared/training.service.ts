import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Training} from './training.model'
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
selectedTraining: Training;
trainingList : Training[];
  constructor(private http : Http) { }
  Post(train : Training){
    var body = JSON.stringify(train);
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions });
    return this.http.post('http://localhost:53336/Api/Training',body,requestOptions).map(x => x.json());

  }
  getTrainingList()
  {
    this.http.get("http://localhost:53336/Api/Training")
    .map((data : Response) => {
      return data.json() as Training[];
    }).toPromise().then(x => {
      this.trainingList =x;
    })    
  }
}