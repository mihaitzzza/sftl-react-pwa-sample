// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace SFTL.ReactTraining.IdentitySrv
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                   };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("ReactTraining.Api", "React training"),
            };

        public static IEnumerable<ApiResource> ApiResources =>
    new List<ApiResource>
    {
                new ApiResource("ReactTraining.Api", "ReactTraining Api", new List<string>{"name", "email", "role"})
                {
                    Scopes = { "ReactTraining.Api" }
                }
    };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {

                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "react.client",
                    ClientName="React Training",
                    ClientUri = "http://localhost:3000",//read from appSettings

                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequireClientSecret = false,
                    AllowAccessTokensViaBrowser=true,


                    RedirectUris = { "http://localhost:3000/signin-oidc", "http://127.0.0.1:8080/signin-oidc" },
                    AllowedCorsOrigins = { "http://localhost:3000","http://127.0.0.1:8080" },
                    PostLogoutRedirectUris = { "http://localhost:3000/signout-callback-oidc", "http://127.0.0.1:8080/signout-callback-oidc" },

                    AllowedScopes = { "openid", "profile", "ReactTraining.Api", }
                },
            };
    }
}