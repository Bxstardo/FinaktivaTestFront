import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { ClientModel } from '../Models/DocumentType/Client.Model';
import { DocumentTypeModel } from '../Models/DocumentType/DocumentType.Model';
import { ClientService } from '../Services/client.service';
import { DocumentTypeService } from '../Services/document-type.service';
import { MessageService } from '../Services/message.service';
import { ProviderService } from '../Services/provider.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild('myModal') myModal

  documentType: DocumentTypeModel[] = [];
  clients : ClientModel[] = []
  client: ClientModel = {
    names: "",
    businessName: "",
    documentNumber: "",
    idClient : 0,
    idDocumentType: "",
    salesLastYear: 0,
    surnames: "",
    providers: ""
  }

  constructor(
    private _messageService: MessageService,
    private _clientService: ClientService,
    private _documentTypeService: DocumentTypeService,
    private _providerService : ProviderService,
    private _router: Router,
    private _modalService: ModalManager,
    ) {
   }

  ngOnInit(): void {
    this.getDocumentType()

  }

  getDocumentType(){
    this._documentTypeService.GetAll().subscribe((data : DocumentTypeModel[]) => {
      this.documentType = data
      this.getClients()
    })
  }

  getNameDocumentType(idType: number){
    return this.documentType.filter(d => d.idDocumentType == idType)[0].name
  }

  getClients(){
    this._clientService.GetAll().subscribe((data: ClientModel[]) =>{
      this.clients = data
    })
  }

  showDetail(idClient: number){
    this._clientService.GetById(idClient).subscribe((data: ClientModel) =>{
      this.client = data
      this._modalService.open(this.myModal, { size: 'lg' });
    })
  }

  removeClient(idClient: number){
    this._messageService.messageConfirmation("Eliminar", "¿Estas seguro que deseas eliminar este usuario?","warning","Eliminar","Cancelar" ,() => {
      this._clientService.Delete(idClient).subscribe(() => {
        this._messageService.messageSuccess("¡Cliente eliminado!", "Se ha eliminado el cliente correctamente")
        this.clients = this.clients.filter(c => c.idClient != idClient)
      })
    })
  }

  editClient(idClient: number){
    this._router.navigate(['/customer/create'], { state: { data: idClient }});
  }
}
