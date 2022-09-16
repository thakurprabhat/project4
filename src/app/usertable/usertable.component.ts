import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from '../apiservice.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ViewcomponentComponent } from '../viewcomponent/viewcomponent.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

export interface userData {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  avatar:string;
}

const ELEMENT_DATA: userData[] = [
  {id: 1, first_name: 'Hydrogen', email: "prabhat", last_name: 'H', avatar: "jdbc"}
];

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit, AfterViewInit {

  
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar', 'action'];
  dataSource = new MatTableDataSource<userData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private apiservice: ApiserviceService, public dialog: MatDialog) { }
  page = 1;
  getListData:any[]= [];
  ngOnInit(): void {
    this.getDatabyPagination(this.page);  
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDatabyPagination(page:number) {
    this.apiservice.getRecordByPagination(page).subscribe((res) => {
      res?.data?.map((obj:any) => {
        this.getListData.push(obj);
      });
      this.dataSource = new MatTableDataSource<userData>(this.getListData);
    });
  }
 
  deleteData(id:number) {
    this.apiservice.deleteRecord(id).subscribe((res) => {
      console.log("fetch by id");
    })
  }

  viewData(id:number) {
    this.apiservice.fetchUserById(id).subscribe((res) => {
      console.log("fetch by id",res);
      this.apiservice.subject$.next(res);
    });
  }

  editData(id:number) {

  }

  editDialog(data:number) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      height: '75%',
      width: '75%',
      data: data,
    });

  }
}
