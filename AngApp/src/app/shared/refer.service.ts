import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Refer } from './refer.model';

@Injectable({
  providedIn: 'root'
})
export class ReferService {

  constructor(private http: HttpClient) { }

  refForms: Refer = new Refer();
  readonly BaseURL = 'http://localhost:52870/api/ReferralForm';
  refList : Refer[];

  postReferralDetail()
  {
    return this.http.post(this.BaseURL , this.refForms);
  } 

  getList()
  {
    this.http.get(this.BaseURL).toPromise().then(res => this.refList = res as Refer[])
  }

  putReferralDetail()
  {
    return this.http.put(`${this.BaseURL}/${this.refForms.id}`, this.refForms);
  }

  delReferralDetail(id:number)
  {
    return this.http.delete(`${this.BaseURL}/${id}`);
  }

}
