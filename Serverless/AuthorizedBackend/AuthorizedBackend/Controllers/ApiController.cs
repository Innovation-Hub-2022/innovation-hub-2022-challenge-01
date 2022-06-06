using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using Amazon.CognitoIdentityProvider;
using System.Threading.Tasks;
using Amazon.CognitoIdentityProvider.Model;

namespace AuthorizedBackend.Controllers
{
    [Route("api")]
    public class ApiController : ControllerBase
    {
        [HttpGet()]
        public async Task<dynamic> Get()
        {
            var idToken = Request.Headers["X-COG-ID"];
            if(!string.IsNullOrEmpty(idToken))
            {
                //var cognitoClient = new AmazonCognitoIdentityProviderClient("AKIAWMQ6GGFRMBMRMZ4S", "aUAfBB2hBAd+vm3rQugx8+ceIoZr4Pf1TjT+X8/C");
                //var users = await cognitoClient.ListUsersAsync( new ListUsersRequest { 
                //    UserPoolId = "eu-west-2_bAGNkXnPw",
                //    AttributesToGet = new List<string>() { 
                //        "name",
                //        "zoneinfo",
                //        "address",
                //        "email" }
                //});
                var handler = new JwtSecurityTokenHandler();
                var jwtIdToken = handler.ReadJwtToken(idToken);
                var claims = jwtIdToken.Claims.GroupBy(o => o.Type).ToDictionary(c => c.Key, c => c.Select(c=>c.Value).ToList());
                //    Select(c => new
                //{
                //    c.Type,
                //    c.Value
                //});
                return Ok(new
                {
                    result = "Get is passed",
                    idTokenClaims = claims,
//                    Users = users
                });
            }
            return Ok(new
            {
                result = "Get is passed",
                idToken = idToken
            });
        }
        [HttpGet("Listall")]
        public ActionResult ListAll()
        {
            return Ok("Ok");
        }

        [HttpPost()]
        public ActionResult Post()
        {
            return Ok("Post is passed");
        }
    }
}
