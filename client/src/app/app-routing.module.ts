import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeViewComponent } from './components/home-view/home-view.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeViewComponent
    },
    // { 
    //   path: '',
    //   redirectTo: '/component_name',
    //   pathMatch: 'full'
    // }
    // {
    //   path: '/component_name',
    //   component: ComponentName,
    //   data: { property: 'idk' }
    // }
    // {
    //     path: 'path_name/:parameter_name',
    //     component: component_name,
    //     resolve: {
    //         details: resolver_name
    //     }
    // }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }
