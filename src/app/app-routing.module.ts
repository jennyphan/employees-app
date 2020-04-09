import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'view-employee/:id',
    loadChildren: () =>
      import('./employees/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailModule
      ),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employee-list/employee-list.module').then(
        (m) => m.EmployeeListModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
