import { NgModule } from '@angular/core';

import { ForgotPasswordModule } from 'app/auth/forgot-password/forgot-password.module';

@NgModule({
    imports: [
        // Authentication
        ForgotPasswordModule,


    ]
})
export class AuthModule
{

}
