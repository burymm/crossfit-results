import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterResultsComponent } from './enter-results/enter-results.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { AppComponent}  from "./app.component";

const routes: Routes = [{
	  path: 'results-enter',
    component: EnterResultsComponent,
  }, {
	  path: 'results-view',
    component: ViewResultsComponent,
	}, {
    path: '',
    redirectTo: 'results-view',
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
