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
import { MatNativeDateModule } from "@angular/material";
import {HeaderComponent} from "./components/header/header.component";
import { UsersService } from './services/users.service';
import { RestService } from './services/rest.service';
import { ResultsService } from './services/results.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    EnterResultsComponent,
    ViewResultsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    HttpClient,
    UsersService,
    RestService,
    ResultsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
