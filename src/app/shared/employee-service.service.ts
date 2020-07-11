import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {


  private EmployeeData = 
    {"data": [{
      "id": 1,
      "name": "Jhon",
      "phone": "9999999999",
      "address":
      {
      "city": "Pune",
      "address_line1":"ABC road",
      "address_line2":"XYZ building",
      "postal_code":"12455"
      }
      }, {
      
      "id": 2,
      "name": "Jacob",
      "phone": "AZ99A99PQ9",
      "address":
      {
      "city": "Pune",
      "address_line1":"PQR road",
      "address_line2":"ABC building",
      "postal_code":"13455"
      }
      }, {
      "id": 3,
      "name": "Ari",
      "phone": "145458522",
      "address":
      {
      "city": "Mumbai",
      "address_line1":"ABC road",
      "address_line2":"XYZ building",
      "postal_code":"12455"
      }
      }]
      }
  

  constructor() { }
  getEmployeeList(){
        return this.EmployeeData.data;
  }
  getInformationForId(id){
    return this.EmployeeData.data[id];
  }
  updateEmployeeData(data,id){
      this.EmployeeData.data[id] = data;
  }
  addEmployee(dataValue){
    this.EmployeeData.data.push(dataValue);
  }
  searchData(value){
   
  let tempArray = [];
  if(value.trim() == ''){
       return this.EmployeeData.data;
  }
   this.EmployeeData.data.map(data=>{
        if(data.address.city.toLowerCase().includes(value.toLowerCase()) || data.name.toLowerCase().includes(value.toLowerCase())){
            tempArray.push(data);
        }
   })
    return tempArray;
  }
}
