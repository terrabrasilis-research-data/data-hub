import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../..//pages/home/home.component';
import { RepositoriesComponent } from '../../pages/repositories/repositories.component';
import { DatasetsComponent } from '../../pages/datasets/datasets.component';
import { LoginComponent } from '../../pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'datasets', component: DatasetsComponent },
  { path: 'login', component: LoginComponent },
  
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class HeaderComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

}