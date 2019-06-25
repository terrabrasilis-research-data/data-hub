import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'datasets', component: DatasetsComponent },
  { path: 'login', component: LoginComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }