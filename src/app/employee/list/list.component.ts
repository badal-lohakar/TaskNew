import { Component, OnInit ,ViewChild ,ElementRef,AfterViewInit} from '@angular/core';
import {EmployeeServiceService} from '../../shared/employee-service.service';
import {Router} from '@angular/router';
import {fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
  import { from } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit ,AfterViewInit{
  @ViewChild('searchValue') input: ElementRef;
  employeeData = [];
  constructor(public employeeService:EmployeeServiceService,private router:Router) { }

  ngOnInit() {
      this.employeeData = this.employeeService.getEmployeeList();
  }
  ngAfterViewInit() {
    
fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((event:KeyboardEvent) => {
         this.employeeData =  this.employeeService.searchData(this.input.nativeElement.value);
        })
    )
    .subscribe();
}
  editUserData(value){
     
      this.router.navigateByUrl('/employees/'+value+'/edit');
  }
 
  checkPhone(value){
    
      if(isNaN(value)){
        return "NA";
      }else{
          return value;
      }
  }
}
