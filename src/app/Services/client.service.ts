import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../Models/DocumentType/Client.Model';
import { ClientProviderModel } from '../Models/DocumentType/ClientProvider.Model';
import { ApiSettings } from './api.settings';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlConfig: ApiSettings
  urlApi: string 
  urlService: string = "client/"

  constructor(private http: HttpClient) {
    this.urlConfig = new ApiSettings();
    this.urlApi = this.urlConfig.urlApi
  }

  GetAll() {
    return this.http.get(this.urlApi + this.urlService + "Get")
  }

  GetById(idClient: number) {
    return this.http.get(this.urlApi + this.urlService  + "GetById/" + idClient)
  }

  Add(client: ClientModel) {
    return this.http.post(this.urlApi + this.urlService  + "Create", client)
  }

  AssignProviders(providers: Array<ClientProviderModel>) {
    return this.http.post(this.urlApi + this.urlService  + "AssignProviders", providers)
  }


  Update(client: ClientModel, idClient: number) {
    return this.http.put(this.urlApi + this.urlService  + "Update/" + idClient, client);
  }

  Delete(idClient: number){
    return this.http.delete(this.urlApi + this.urlService  + "Delete/" + idClient)
  }
}
