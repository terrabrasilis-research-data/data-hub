import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RepositorieComponent } from './pages/repositorie/repositorie.component';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewdatasetComponent } from './pages/newdataset/newdataset.component';
import { NewrepositorieComponent } from './pages/newrepositorie/newrepositorie.component';
import { MyrepositoriesComponent } from './pages/myrepositories/myrepositories.component';
import { MydatasetsComponent } from './pages/mydatasets/mydatasets.component';
import { MyservicesComponent } from './pages/myservices/myservices.component';
import { MygroupsComponent } from './pages/mygroups/mygroups.component';
import { NewgroupComponent } from './pages/newgroup/newgroup.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupComponent } from './pages/group/group.component';
import { EdituserComponent } from './pages/edituser/edituser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'datasets', component: DatasetsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'repositories/:id', component: RepositorieComponent },
  { path: 'datasets/:id', component: DatasetComponent },
  { path: 'groups/:id', component: GroupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create/dataset', component: NewdatasetComponent },
  { path: 'create/repositorie', component: NewrepositorieComponent },
  { path: 'create/group', component: NewgroupComponent },
  { path: 'view/repositories', component: MyrepositoriesComponent },
  { path: 'view/datasets', component: MydatasetsComponent },
  { path: 'view/groups', component: MygroupsComponent },
  { path: 'view/services', component: MyservicesComponent },
  { path: 'edit/user', component: EdituserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }  