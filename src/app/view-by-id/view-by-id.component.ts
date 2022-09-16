import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.css']
})
export class ViewByIdComponent implements OnInit {
  userDetails: any;

  constructor(private apiservice: ApiserviceService) { }

  ngOnInit(): void {
    console.log("yes")
    this.apiservice.subject$.subscribe((response) => {
      this.userDetails = response;
      console.log("yes125",response,this.userDetails)
    });
  }

}
