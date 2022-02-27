import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/Models/DocumentType/Client.Model';
import { ClientProviderModel } from 'src/app/Models/DocumentType/ClientProvider.Model';
import { DocumentTypeModel } from 'src/app/Models/DocumentType/DocumentType.Model';
import { Provider } from 'src/app/Models/DocumentType/Provider.Model';
import { ClientService } from 'src/app/Services/client.service';
import { DocumentTypeService } from 'src/app/Services/document-type.service';
import { MessageService } from 'src/app/Services/message.service';
import { ProviderService } from 'src/app/Services/provider.service';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  formRegister: FormGroup;
  documentType: DocumentTypeModel[];
  providers: Array<Provider> = []
  providersSelected: Array<Provider> = []
  providersByBd: Array<Provider> = []

  idProvider : number
  client: ClientModel
  clientExists: boolean = false
  /**
   *
   */
  constructor(
    private _fb: FormBuilder, 
    private _documentTypeService: DocumentTypeService,
    private _providerService : ProviderService,
    private _messageService: MessageService,
    private _clientService: ClientService,
    private _router: Router

  ) {
    
  }
 
  ngOnInit() {
    this.initForm();
    this.getProvider()
    this.getDocumentType()
    this.client = history.state.data;
    if (this.client != null) {
      this.loadData()
    }
  }

  initForm(){
    this.formRegister = this._fb.group({
      names: ['', Validators.compose([Validators.required])],
      surnames: ['', Validators.compose([Validators.required])],
      idDocumentType: ['', Validators.compose([Validators.required])],
      documentNumber: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])],
      salesLastYear: ['', Validators.compose([Validators.required])],
    });
  }

  loadData(){
    this.clientExists = true
    this.formRegister.patchValue({names : this.client.names})
    this.formRegister.patchValue({surnames : this.client.surnames})
    this.formRegister.patchValue({idDocumentType : this.client.idDocumentType})
    this.formRegister.patchValue({documentNumber : this.client.documentNumber})
    this.formRegister.patchValue({businessName : this.client.businessName})
    this.formRegister.patchValue({salesLastYear : this.client.salesLastYear})
    this.getProviderUser(this.client.idClient)

  }

  getProviderUser(idClient: number){
    this._providerService.GetByClient(idClient).subscribe((data: Provider[]) => {
      this.providersByBd = data
      this.providersByBd.forEach(element => {
        this.idProvider = element.idProvider
        element.action = "Remove"
        this.addProvider()
      });
      this.idProvider = 0
    })
  }

  getProvider(){
    this._providerService.GetAll().subscribe((data : Provider[]) => {
      this.providers = data
      this.providers.forEach(p => {
        p.action = "Add"
        p.show = true
      })
    })
  }

  getDocumentType(){
    this._documentTypeService.GetAll().subscribe((data : DocumentTypeModel[]) => {
      this.documentType = data
    })
  }

  addProvider(){
    if (this.idProvider != 0 ) {
      const provider: Provider = new Provider()
      provider.idProvider = this.idProvider
      provider.name = this.providers.filter(p => p.idProvider == this.idProvider)[0].name
      this.providersSelected.push(
        provider
      );
      this.providers.filter(p => p.idProvider == this.idProvider)[0].show = false
      this.idProvider = 0
    }
  }

  removeProvider(id: number, action: string){
    this.providersSelected = this.providersSelected.filter(p => p.idProvider != id)
    this.providers.filter(p => p.idProvider == id)[0].show = true

  }

  save(){
    if (this.formRegister.valid) {
      if (this.providersSelected.length < 1) {
        this._messageService.messageError("Por favor seleccione por lo menos 1 proveedor")
        return
      }
      if (this.formRegister.get("idDocumentType").value == 2) {
        this._messageService.messageError("No se pueden ingresar usuarios con identificación extranjera")
        return
      }

      const client: ClientModel = new ClientModel()
      client.names = this.formRegister.get("names").value
      client.businessName = this.formRegister.get("businessName").value
      client.documentNumber = String(this.formRegister.get("documentNumber").value)
      client.idDocumentType = this.formRegister.get("idDocumentType").value
      client.surnames = this.formRegister.get("surnames").value
      client.salesLastYear = this.formRegister.get("salesLastYear").value

      if (this.clientExists) {
        this._clientService.Update(client, this.client.idClient).subscribe((data) => {
          var providers : ClientProviderModel[] = []
          this.providersSelected.forEach(item => {
            var provider = new ClientProviderModel()
            provider.idClient = this.client.idClient
            provider.idProvider = item.idProvider
            provider.action = item.action
            providers.push(provider)
          })
          this._clientService.AssignProviders(providers).subscribe(data => {
            this._messageService.messageSuccessWithFunction("¡Cliente guardado!","El cliente se ha actualizado correctamente", () =>{
              this._router.navigate(['/customer']);
            })
          })
        })
      } else {
        this._clientService.Add(client).subscribe((data: number) => {
          var providers : ClientProviderModel[] = []
          this.providersSelected.forEach(item => {
            var provider = new ClientProviderModel()
            provider.idClient = data
            provider.idProvider = item.idProvider
            provider.action = item.action
            providers.push(provider)
          })
          this._clientService.AssignProviders(providers).subscribe(data => {
            this._messageService.messageSuccessWithFunction("¡Cliente guardado!","El cliente se ha guardado correctamente", () =>{
              this._router.navigate(['/customer']);
            })
          })
        })
      }
    } else{
      this._messageService.messageError("Diligencie todos los campos por favor")
    }

  }
}
