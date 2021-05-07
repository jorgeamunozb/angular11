import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { CreateComponent } from './component/create/create.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ErrorComponent } from './component/error/error.component';

const appRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'sobre-mi', component: AboutComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'crear-proyecto', component: CreateComponent },
    { path: 'proyectos', component: ProjectsComponent },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);