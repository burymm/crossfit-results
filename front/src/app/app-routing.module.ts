import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterResultsComponent } from './enter-results/enter-results.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { AppComponent}  from "./app.component";
import {UserResultsComponent} from "./user-results/user-results.component";

const routes: Routes = [{
	  path: 'add-result',
    component: EnterResultsComponent,
  }, {
	  path: 'results',
    component: ViewResultsComponent,
	}, {
    path: 'results/:cardNumber',
    component: UserResultsComponent,
	}, {
    path: '',
    redirectTo: 'results',
    pathMatch: 'full'
  },
];


@NgModule({
	imports: [
	  RouterModule.forRoot(routes, { enableTracing: false }),
  ],

	exports: [
		RouterModule
	],
	declarations: []
})
export class AppRoutingModule { }
