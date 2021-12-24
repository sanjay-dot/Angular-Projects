import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgbModal,NgbModalRef,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  EnteredValue = '';
  data:any = [];
  closeResult = '';
  // modelref : NgbModalRef;

  update = {};
  updatedValue:any = [];
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
    
  }
SubmitHandler(){
    // console.log(this.EnteredValue);
    if(!this.EnteredValue){
      Swal.fire("Please enter something")
    }
    else{
      // Swal.fire("Added Successfully")
    const g ={
        id:Math.floor(Math.random()*100),
        Desc: this.EnteredValue,
        Time : Date.now()
      }
    this.data.push(g);
    this.EnteredValue = '';
    }
  }
DeleteHandler(id:number) {
 this.data = this.data.filter((item:any) => item.id !== id)
} 

UpdateHandler(content:any,id:number){

  // this.update = this.data.filter((item:any) => item.id == id)
  console.log(id);
    
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ChangeHandler(id:number){
    console.log(id);   
    // console.log(this.updatedValue);
    // const data = {
    //   id:id,
    //   Desc:this.update,
    // }

    this.data = this.data.map((e:any)=>{
      if(e.id == id){
        e.Desc = this.update
        e.Time = Date()
      }
      return e
    })

    console.log(this.data);
    this.modalService.dismissAll();
    // this.updatedValue.push(data);
    console.log(this.updatedValue);

  }

  updater(event:any){
    this.update = (<HTMLInputElement>event.target).value    
    console.log(this.update);
    }
  }

