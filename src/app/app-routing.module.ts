
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ConnectedViewComponent } from './connected-view/connected-view.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'projects', component: ConnectedViewComponent, canActivate: [AuthGuard] },
	{ path: 'blabla', component: ConnectedViewComponent},
	{ path: 'login', component: AuthComponent }
];

@NgModule({
	imports:[
		RouterModule.forRoot(routes)
	],
	exports:[
		RouterModule
	]
})
export class AppRoutingModule {}
