import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-viewcomponent',
  templateUrl: './viewcomponent.component.html',
  styleUrls: ['./viewcomponent.component.css']
})
export class ViewcomponentComponent implements OnInit {

  userForm!:FormGroup;
  @Input() item!: any; 

  constructor(private modalService: NgbModal,
    private http: HttpClient, private apiservice: ApiserviceService,
    private formBuilder: FormBuilder) { }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    if(this.item) {
      this.openEditForm();
    } else {
      this.initForm();
    }
    this.userForm = this.formBuilder.group({
      name: [''],
      job: [''],
    });
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: [''],
      job: [''],
    });
  }

  openEditForm() {
    console.log("edit",this.item)
    this.userForm = this.formBuilder.group({
      name: [this.item?.first_name],
      job: [this.item?.last_name],
    });
  }

  onSubmit() {
    if (this.item) {
      this.updateData(); // method for update
    } else {
      this.formSubmit();
    }
  }


  formSubmit() {
    let getRecords = {
      name: this.userForm.controls["name"].value,
      job: this.userForm.controls["job"].value
    }
    this.apiservice.addRecord(getRecords).subscribe((res) => {
      console.log(res);
    })
    // this.deleteData("183") // method for delete

    // this.updateData(); // method for update

    // this.getUserById(183);

    this.getDatabyPagination()  
  }

  getDatabyPagination() {
    this.apiservice.getRecordByPagination(2).subscribe((res) => {
      console.log("res by pagination",res);
    });
  }

  deleteData(id:any) {
    this.apiservice.deleteRecord(id).subscribe((res) => {
      console.log(res);
    })
  }

  updateData() {
    let getRecords = {
      name: this.userForm.controls["name"].value,
      job: this.userForm.controls["job"].value
    }
    this.apiservice.updateData(getRecords).subscribe((res) => {
      console.log("update ",res)
    });
  }

  getUserById(id:number) {
    id =775
    this.apiservice.fetchUserById(id).subscribe((res) => {
      console.log("fetch by id",res);
    })
  }

}
