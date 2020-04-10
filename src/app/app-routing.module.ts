import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  {
    path: 'update-employee/:id',
    loadChildren: () =>
      import('./employees/employee-create/employee-create.module').then(
        (m) => m.EmployeeCreateModule
      ),
  },
  {
    path: 'update-employee',
    loadChildren: () =>
      import('./employees/employee-create/employee-create.module').then(
        (m) => m.EmployeeCreateModule
      ),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
