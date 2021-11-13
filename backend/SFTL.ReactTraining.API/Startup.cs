using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using SFTL.ReactTraining.DAL;
using SFTL.ReactTraining.DAL.Interfaces;
using System.Net.Http;
using System.Security.Claims;

namespace SFTL.ReactTraining.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<IProductRepo, ProductRepository>();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("dbConnection")));
            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = Configuration["Authorization:Authority"];//get from appsettings
                    options.RequireHttpsMetadata = false;
                    options.Audience = "ReactTraining.Api";
                    options.SaveToken = true;
                    options.BackchannelHttpHandler = new HttpClientHandler { ServerCertificateCustomValidationCallback = delegate { return true; } };
                })
                .AddCookie();

            services.AddMvcCore(options => {
                options.EnableEndpointRouting = false;
            })
            .AddAuthorization(options =>
            options.AddPolicy("AdminOnly",
                 policy => policy.RequireClaim(ClaimTypes.Role, "admin"))
            
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            IdentityModelEventSource.ShowPII = true;

            app.UseCors(builder =>
                builder.WithOrigins(Configuration["Authorization:ClientOrigin"])
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );
            app.UseAuthentication();

            app.UseMvc();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
