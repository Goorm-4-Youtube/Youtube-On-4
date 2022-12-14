import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://dev-1foz5--v.us.auth0.com',
      redirectUrl: 'http://localhost:4200/callback',
      clientId: 'f3VgzKT0ITlXTFh1CILg6Z5FlFV1G0ce',
      scope: 'openid profile offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      secureRoutes: ['http://localhost:8080'],
      customParamsAuthRequest : {
        audience: 'http://localhost:8080'
      }
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {}
