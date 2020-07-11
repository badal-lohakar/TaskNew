import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmployeeServiceService} from '../../shared/employee-service.service'
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  UserId;
  buttonFlag = true;
  constructor(private formBuilder: FormBuilder,private employeeService:EmployeeServiceService
    ,private route: ActivatedRoute,private router:Router,private toatser:ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['',[ Validators.required,Validators.minLength(4)]],
      phone: ['', Validators.required],
      city: [''],
      address1: [''],
      address2: [''],
      postalcode: ['']
      
  });
  this.UserId = this.route.snapshot.params.id;
  if(this.UserId){
    if(this.employeeService.getEmployeeList().length >= this.UserId){
      this.setUserDataToInputs(this.UserId);
      this.buttonFlag = false;
    }else{
      this.router.navigateByUrl('');
    }
  }
  }
  get f() { return this.addForm.controls; }
  updateData(){
    const data = {
      "id": this.UserId,
      "name": this.f.name.value,
      "phone": this.f.phone.value,
      "address":
      {
      "city": this.f.city.value,
      "address_line1":this.f.address1.value,
      "address_line2":this.f.address2.value,
      "postal_code":this.f.postalcode.value
      }
    }
    this.employeeService.updateEmployeeData(data,this.UserId-1);
    this.toatser.success("Updated");
    this.router.navigateByUrl('employees');
  }
  saveData(){
    if(this.addForm.valid){
        this.submitted = false;
        console.log(this.employeeService.getEmployeeList().length);
        const newData = {
          "id": (this.employeeService.getEmployeeList().length)+1,
          "name": this.f.name.value,
          "phone": this.f.phone.value,
          "address":
          {
          "city": this.f.city.value,
          "address_line1":this.f.address1.value,
          "address_line2":this.f.address2.value,
          "postal_code":this.f.postalcode.value
          }
        }
        this.employeeService.addEmployee(newData);
        this.toatser.success("Added");
        this.addForm.reset();
        this.router.navigateByUrl('employees');
    }else{
      this.submitted = true;
    }
        
  }
  setUserDataToInputs(id){
      let currentUserData = this.employeeService.getInformationForId(id-1);
      this.f.name.setValue(currentUserData.name);
      if(!isNaN(parseInt(currentUserData.phone))){
        this.f.phone.setValue(currentUserData.phone);
      }
      
      this.f.city.setValue(currentUserData.address.city);
      this.f.address1.setValue(currentUserData.address.address_line1);
      this.f.address2.setValue(currentUserData.address.address_line2);
      this.f.postalcode.setValue(currentUserData.address.postal_code);
  }
}
