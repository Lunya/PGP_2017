
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsComponent } from './projects/projects.component';
import {SignupComponent} from './signup/signup.component';
import {AuthService } from './services/auth.service';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent  },
	{ path: 'projects', component: ProjectViewComponent},
	{ path: 'signup', component: SignupComponent },
	{ path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
	{ path: 'project/:id', component: ProjectViewComponent }
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
