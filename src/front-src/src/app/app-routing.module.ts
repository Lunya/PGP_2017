
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProjectComponent } from './home-project/project/project.component';
import { SprintComponent } from './home-project/sprint/sprint.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent  },
	{ path: 'signup', component: SignupComponent },
	{ path: 'workspace', component: WorkspaceComponent/*, canActivate: [AuthGuard]  */},
	{ path: 'project', component: ProjectComponent},
	{ path: 'account', component: AccountComponent},
	{ path: 'sprint', component: SprintComponent},
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
