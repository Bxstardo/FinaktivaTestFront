import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateCustomerComponent } from "./customer/components/create-customer/create-customer.component";
import { CustomerComponent } from "./customer/customer.component";
import { EmployeeComponent } from "./employee/employee.component";
import { LayoutComponent } from "./layout/layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProviderComponent } from "./provider/provider.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: CustomerComponent
            },
            {
                path: 'customer',
                component: CustomerComponent
            },
            {
                path: 'customer/create',
                component: CreateCustomerComponent
            },
            {
                path: 'provider',
                component: ProviderComponent
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}