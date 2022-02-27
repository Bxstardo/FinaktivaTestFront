import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messageInfo(title, message) {
    Swal.fire({
      title: title,
      html: message,
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });
  }

  messageSuccess(title, message) {
    Swal.fire({
      title: title,
      html: message,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });
  }

  messageSuccessWithFunction(title, message, funtionSuccess) {
    Swal.fire({
      title: title,
      html: message,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if(result.isConfirmed){
         funtionSuccess(); 
      }
    });
  }

  messageWaring(title, message) {
    Swal.fire({
      title: title,
      html: message,
      icon: "warning",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });
  }

  messageWaringWithFunction(title, message, funtionWaring) {
    Swal.fire({
      title: title,
      html: message,
      icon: "warning",
   
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        funtionWaring();
      }
    });
  }

  messageConfirmation(title, message, typeMessage, textButtonConfirm, textButtonCancel, functionConfirm) {
    Swal.fire({
      title: title,
      html: message,
      icon: typeMessage,
      showCancelButton: true,
      cancelButtonColor: '#DD6B55',
      confirmButtonColor: '#31a84f',
      confirmButtonText: textButtonConfirm,
      cancelButtonText: textButtonCancel,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        functionConfirm(result.value);
      }
    });
  }

  messageError(message) {
    Swal.fire({
      title: "Error",
      html: message,
      icon: "error",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });
  }

  // messageErrorWithFunction(message, functionError) {
  //   Swal.fire({
  //     title: "Error",
  //     html: message,
  //     icon: "error",
  //     onClose: () => {
  //       if (typeof (functionError) != 'undefined') { functionError(); }
  //     },
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     allowEnterKey: false
  //   });
  // }

  messageInfoInterval(message, interval, functionSuccess) {
    Swal.fire({
      html: message,
      timer: interval,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        if (typeof (functionSuccess) != 'undefined') { functionSuccess(); }
      }
    });
  }
}
