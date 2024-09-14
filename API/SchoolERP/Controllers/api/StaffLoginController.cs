using SchoolClasses;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/StaffLogin")]

    public class StaffLoginController : ApiController
    {
        [HttpPost]
        [Route("StaffLoginList")]
        public ExpandoObject StaffLoginList(StaffLogin model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from d1 in dataContext.StaffLogins
                           join d2 in dataContext.Staffs on d1.StaffId equals d2.StaffId
                           join d3 in dataContext.Schools on d1.SchoolId equals d3.SchoolId
                           join s1 in dataContext.StaffLoginRoles on d1.StaffLoginId equals s1.StaffLoginId into subStaffLoginRole
                           where (model.StaffLoginId == d1.StaffLoginId || model.StaffLoginId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           select new
                           {
                               d1.StaffLoginId,
                               d1.StaffId,
                               d2.StaffName,
                               d1.UserName,
                               d1.LoginPassword,
                               d1.SchoolId,
                               d3.SchoolName,
                               d1.Status,
                               StaffLoginRoleList = from m1 in subStaffLoginRole
                                                    join m2 in dataContext.Roles on m1.RoleId equals m2.RoleId
                                                    select new { m1.RoleId, m1.StaffLoginRoleId, m2.RoleTitle },
                           }).ToList();

                ResponseMessage.StaffLoginList = list;
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        public class SaveStaffLoginModel
        {
            public StaffLogin StaffLogin { get; set; }
            public List<StaffLoginRole> StaffLoginRoleList { get; set; }
            public int StaffLoginId { get; set; }
        }

        [HttpPost]
        [Route("saveStaffLogin")]
        public ExpandoObject SaveStaffLogin(SaveStaffLoginModel obj)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var model = obj.StaffLogin;
                StaffLogin StaffLogin = null;
                if (model.StaffLoginId > 0)
                {
                    StaffLogin = dataContext.StaffLogins.Where(x => x.StaffLoginId == model.StaffLoginId).First();
                    StaffLogin.UpdatedBy = obj.StaffLoginId;
                    StaffLogin.UpdatedDate = DateTime.Now;
                }
                else
                {
                    StaffLogin = new StaffLogin();
                    StaffLogin.CreatedBy = obj.StaffLoginId;
                    StaffLogin.CreatedDate = DateTime.Now;
                }
                StaffLogin.StaffId = model.StaffId;
                StaffLogin.UserName = model.UserName;
                StaffLogin.LoginPassword = model.LoginPassword;
                StaffLogin.SchoolId = model.SchoolId;
                StaffLogin.Status = model.Status;
                if (StaffLogin.StaffLoginId == 0)
                    dataContext.StaffLogins.InsertOnSubmit(StaffLogin);
                dataContext.SubmitChanges();

                var deleteRole = dataContext.StaffLoginRoles.Where(x => x.StaffLoginId == StaffLogin.StaffLoginId && !obj.StaffLoginRoleList.Select(y => y.StaffLoginRoleId).Contains(x.StaffLoginRoleId));
                dataContext.StaffLoginRoles.DeleteAllOnSubmit(deleteRole);
                dataContext.SubmitChanges();

                obj.StaffLoginRoleList.ForEach(role =>
                {
                    StaffLoginRole StaffLoginRole = null;
                    if (role.StaffLoginRoleId > 0)
                    {
                        StaffLoginRole = dataContext.StaffLoginRoles.Where(x => x.StaffLoginRoleId == role.StaffLoginRoleId).First();
                        StaffLoginRole.UpdatedBy = obj.StaffLoginId;
                        StaffLoginRole.UpdatedDate = DateTime.Now;
                    }
                    else
                        StaffLoginRole = new StaffLoginRole();
                    StaffLoginRole.StaffLoginId = StaffLogin.StaffLoginId;
                    StaffLoginRole.RoleId = role.RoleId;

                    if (StaffLoginRole.StaffLoginRoleId == 0)
                        dataContext.StaffLoginRoles.InsertOnSubmit(StaffLoginRole);
                    dataContext.SubmitChanges();
                });
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
        [Route("deleteStaffLogin")]
        public ExpandoObject DeleteStaffLogin(StaffLogin model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var StaffLogin = dataContext.StaffLogins.Where(x => x.StaffLoginId == model.StaffLoginId).First();
                dataContext.StaffLogins.DeleteOnSubmit(StaffLogin);
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

        [HttpPost]
        [Route("StaffLogin")]
        public ExpandoObject StaffLogin(StaffLogin model)
        {
            dynamic response = new ExpandoObject();
            SchoolDataContext dataContext = new SchoolDataContext();
            LoginLog loginLog = new LoginLog();
            try
            {
                loginLog.IPAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                if (HttpContext.Current.Request.Browser.IsMobileDevice)
                    loginLog.LoginDevice = "Mobile";
                else
                    loginLog.LoginDevice = "Computer";
                if (HttpContext.Current.Request.UrlReferrer != null)
                    loginLog.ReferrerUrl = HttpContext.Current.Request.UrlReferrer.ToString();
                else
                    loginLog.ReferrerUrl = "";


                HttpBrowserCapabilities bcr = HttpContext.Current.Request.Browser;
                loginLog.UserName = model.UserName;
                loginLog.LoginPassword = (model.LoginPassword);
                //loginLog.LoginPassword = Password;

                loginLog.ClientBrowser = bcr.Browser;
                loginLog.LoginTime = DateTime.Now;
                loginLog.LastUpdatedOn = DateTime.Now;
                loginLog.LoginResult = (byte)LoginResult.Error;

                int countStaffLogin = (from e1 in dataContext.StaffLogins
                                       where (e1.UserName == model.UserName)
                                       select e1).Count();
                if (countStaffLogin <= 0)
                {
                    loginLog.LoginResult = (byte)LoginResult.WrongUserName;
                    throw new Exception("Invalid User Id or Password");
                }
                var employeeLogin = (from e1 in dataContext.StaffLogins
                                     where (e1.UserName == model.UserName)
                                     select e1).First();

                if (employeeLogin.Status == (byte)Status.Inactive)
                {
                    loginLog.LoginResult = (byte)LoginResult.AccountNotActive;
                    throw new Exception("Invalid User Id or Password");
                }
                if (employeeLogin.LoginPassword != model.LoginPassword)
                {
                    loginLog.LoginResult = (byte)LoginResult.WrongPassword;
                    throw new Exception("Invalid User Id or Password");
                }

                loginLog.LoginResult = (byte)LoginResult.Successful;

                response.UserDetail = (from d1 in dataContext.StaffLogins
                                       join s1 in dataContext.Staffs on d1.StaffId equals s1.StaffId
                                       join d2 in dataContext.Designations on s1.DesignationId equals d2.DesignationId
                                       where d1.StaffLoginId == employeeLogin.StaffLoginId
                                       select new
                                       {
                                           d1.StaffLoginId,
                                           d1.StaffId,
                                           s1.StaffName,
                                           d1.UserName,
                                           d2.DesignationName
                                       }).First();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                dataContext.LoginLogs.InsertOnSubmit(loginLog);
                dataContext.SubmitChanges();
                response.Message = ex.Message;
            }
            return response;
        }

        public class ChangePasswordModel
        {
            public string CurrentPassword { get; set; }
            public string NewPassword { get; set; }
            public int Id { get; set; }
        }

        [HttpPost]
        [Route("changePassword")]
        public ExpandoObject ChangePassword(ChangePasswordModel model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                StaffLogin StaffLogin = dataContext.StaffLogins.Where(x => x.StaffLoginId == model.Id).First();
                if (model.CurrentPassword != StaffLogin.LoginPassword)
                    throw new Exception("Invalid Current password!!");
                //if (CryptoEngine.Encrypt(model.CurrentPassword) != StaffLogin.LoginPassword)
                //    throw new Exception("Invalid Current password!!");
                StaffLogin.UpdatedDate = DateTime.Now;
                StaffLogin.UpdatedBy = model.Id;
                StaffLogin.LoginPassword = model.NewPassword;
                dataContext.SubmitChanges();

                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}

