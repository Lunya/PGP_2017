
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
	{ path: 'projects', component: ProjectViewComponent},
	{ path: 'login', component: AuthComponent},
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
