import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ProductsComponent } from '../components/products/products.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'products',component:ProductsComponent},
    {path:'contact',component:ContactComponent}
];
