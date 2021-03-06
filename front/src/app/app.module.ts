import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { EnterResultsComponent } from './enter-results/enter-results.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { AppRoutingModule } from './/app-routing.module';
import {MatAutocompleteModule, MatFormFieldModule, MatNativeDateModule} from "@angular/material";
import {HeaderComponent} from "./components/header/header.component";
import { UsersService } from './services/users.service';
import { RestService } from './services/rest.service';
import { ResultsService } from './services/results.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExercisesModule} from "./exercises/exercises.module";
import {RequestInterceptor} from "./services/request-interceptor";
import { FooterComponent } from './components/footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import {UserResultsComponent} from "./user-results/user-results.component";
import { LoginComponent } from "./unathorize/login/login.component";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    EnterResultsComponent,
    ViewResultsComponent,
    HeaderComponent,
    FooterComponent,
    UserResultsComponent,
    LoginComponent,
    UserInfoComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
    MatNativeDateModule,
    HttpClientModule,
    ExercisesModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AgGridModule.withComponents([ViewResultsComponent]),
    NgxChartsModule
  ],
  providers: [
    HttpClient,
    UsersService,
    RestService,
    ResultsService,
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
