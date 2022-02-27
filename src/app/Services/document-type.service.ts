import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { ApiSettings } from './api.settings';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  urlConfig: ApiSettings
  urlApi: string 
  urlService: string = "documentType/"

  constructor(private http: HttpClient) {
    this.urlConfig = new ApiSettings();
    this.urlApi = this.urlConfig.urlApi
  }

  GetAll() {
    return this.http.get(this.urlApi + this.urlService + "Get");
  }
}
