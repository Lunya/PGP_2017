
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import {SignupComponent} from './signup/signup.component';
import {AuthService } from './services/auth.service';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent  },
	{ path: 'projects', component: ProjectComponent},
	{ path: 'signup', component: SignupComponent },
	{ path: 'projects', component: WorkspaceComponent, canActivate: [AuthGuard] },
	{ path: 'project/:id', component: ProjectComponent }
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
