import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './employee/list/list.component';
import { AddComponent } from './employee/add/add.component';

const routes: Routes = [
  {path:'', children:[
    {path:'',component:ListComponent}
  ]},
    {path:'employees', children:[
    {path:'',component:ListComponent},
    {path:'add',component:AddComponent}
    
  ]},
  {path:'employees/:id/edit',component:AddComponent},
  {path:'**',redirectTo:'employees',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
