using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(APISchoolAUTH.Front.Startup))]
namespace APISchoolAUTH.Front
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
