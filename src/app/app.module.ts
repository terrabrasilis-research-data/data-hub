import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material'  
import { MatPaginatorModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HomeComponent } from './pages/home/home.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarModule } from 'ng-sidebar';
import { DialogContentExampleDialog } from './pages/datasets/datasets.component';

import { BboxComponent } from './ui/bbox/bbox.component';
import { TintervalComponent } from './ui/tinterval/tinterval.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RepositorieComponent } from './pages/repositorie/repositorie.component';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewdatasetComponent } from './pages/newdataset/newdataset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoriesComponent,
    DialogContentExampleDialog,
    DatasetsComponent,
    LoginComponent,
    SignupComponent,
    RepositorieComponent,
    DatasetComponent,
    DashboardComponent,
    NewdatasetComponent
  ],
  entryComponents: [ DialogContentExampleDialog, BboxComponent, TintervalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatTooltipModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule,
    UiModule,
    MatDialogModule,
    RouterModule,
    LeafletModule,
    SidebarModule.forRoot(),
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }