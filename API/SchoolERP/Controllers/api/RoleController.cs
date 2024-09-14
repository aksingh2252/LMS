using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Role")]
    public class RoleController : ApiController
    {
        [HttpPost]
        [Route("RoleList")]
        public ExpandoObject RoleList(Role model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Roles
                           where (model.RoleId == d1.RoleId || model.RoleId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.RoleTitle
                           select new
                           {
                               d1.RoleId,
                               d1.RoleTitle,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.RoleList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveRole")]
        public ExpandoObject SaveRole(Role model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Role Role = null;
                if (model.RoleId > 0)
                {
                    Role = dataContext.Roles.Where(x => x.RoleId == model.RoleId).First();
                    Role.UpdatedBy = model.UpdatedBy;
                    Role.UpdatedDate = DateTime.Now;
                }
                else
                {
                    Role = new Role();
                }
                Role.RoleTitle = model.RoleTitle;
                Role.Status = model.Status;

                if (Role.RoleId == 0)
                    dataContext.Roles.InsertOnSubmit(Role);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("IX"))
                    ResponseMessage.Message = "This record is already exist";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("deleteRole")]
        public ExpandoObject DeleteRole(Role model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Role = dataContext.Roles.Where(x => x.RoleId == model.RoleId).First();
                dataContext.Roles.DeleteOnSubmit(Role);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("FK"))
                    ResponseMessage.Message = "This record is in use.so can't delete.";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}
