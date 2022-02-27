import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from './api.settings';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  urlConfig: ApiSettings
  urlApi: string 
  urlService: string = "provider/"

  constructor(private http: HttpClient) {
    this.urlConfig = new ApiSettings();
    this.urlApi = this.urlConfig.urlApi
  }

  GetAll() {
    return this.http.get(this.urlApi + this.urlService + "Get");
  }

  GetByClient(idClient: number) {
    return this.http.get(this.urlApi + this.urlService + "GetByClient/" + idClient);
  }
}
