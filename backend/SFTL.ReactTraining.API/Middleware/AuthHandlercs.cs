using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.API.Middleware
{
    public class AuthHandlercs : IAuthorizationHandler
    {
        public Task HandleAsync(AuthorizationHandlerContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}
