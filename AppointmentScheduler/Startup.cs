using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AppointmentScheduler
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
      //Configure Database Connection
      String connectionString = String.Format("server={0};database={1};user={2};password={3}", Configuration["DatabaseSettings:server"], Configuration["DatabaseSettings:database"], Configuration["DatabaseSettings:user"], Configuration["DatabaseSettings:password"]);
      services.AddDbContext<AppointmentSchedulerContext>(options =>
      {
        options.UseMySQL(connectionString);
      });


      //Configure JWT
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = false, ValidateAudience = false, ValidateLifetime = false, ValidateIssuerSigningKey = true, IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:SecurityKey"])) };
      });

      //Enabling CORS
      var corsBuilder = new CorsPolicyBuilder();
      corsBuilder.AllowAnyHeader();
      corsBuilder.AllowAnyMethod();
      corsBuilder.AllowAnyOrigin();
      corsBuilder.AllowCredentials();

      services.AddCors(options =>
      {
        options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
      });

      //Configure to use DI for Email Settings
      services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

      //Configure to use DI for Email Service
      services.AddTransient<EmailService>();

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseAuthentication();
      app.UseCors("SiteCorsPolicy");
      app.Use(async (context, next) =>
      {
        await next();

        if (context.Response.StatusCode == 404 &&
                  !Path.HasExtension(context.Request.Path.Value) &&
                  !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });
      app.UseStaticFiles();
      app.UseMvc();
    }


  }
}
