using SchoolClasses;
using System;
using System.Data.Common;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Menu")]
    public class MenuController : ApiController
    {

        [HttpPost]
        [Route("MenuList")]
        public ExpandoObject MenuList(Menu model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Menus
                           where d1.ParentMenuId == null
                           orderby d1.MenuNo
                           join d2 in dataContext.Pages on d1.PageId equals d2.PageId into subPages
                           select new
                           {
                               d1.MenuId,
                               d1.PageId,
                               PageName = subPages.Any() ? subPages.First().PageName : null,
                               d1.MenuTitle,
                               d1.MenuNo,
                               d1.ParentMenuId,
                               d1.MenuIcon,
                               d1.Status,
                               MenuList = from t1 in dataContext.Menus
                                          where t1.ParentMenuId == d1.MenuId
                                          orderby t1.MenuNo
                                          join t2 in dataContext.Pages on t1.PageId equals t2.PageId
                                          select new
                                          {
                                              t1.MenuId,
                                              t1.PageId,
                                              t2.PageName,
                                              t1.MenuTitle,
                                              t1.MenuNo,
                                              t1.ParentMenuId,
                                              t1.MenuIcon,
                                              t1.Status,
                                          }
                           };

                ResponseMessage.MenuList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveMenu")]
        public ExpandoObject SaveMenu(Menu model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Menu Menu = null;
                if (model.MenuId > 0)
                {
                    Menu = dataContext.Menus.Where(x => x.MenuId == model.MenuId).First();
                    Menu.UpdatedBy = model.UpdatedBy;
                    Menu.UpdatedDate = DateTime.Now;
                }
                else
                {
                    Menu = new Menu();
                    var preMenu = dataContext.Menus.Where(x => x.ParentMenuId == model.ParentMenuId);
                    if (preMenu.Any())
                        Menu.MenuNo = preMenu.OrderByDescending(x => x.MenuNo).First().MenuNo + 1;
                    else
                        Menu.MenuNo = 1;
                }

                Menu.PageId = model.PageId;
                Menu.MenuIcon = model.MenuIcon;
                Menu.ParentMenuId = model.ParentMenuId;
                Menu.MenuTitle = model.MenuTitle;
                Menu.Status = model.Status;

                if (Menu.MenuId == 0)
                    dataContext.Menus.InsertOnSubmit(Menu);
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
        [Route("deleteMenu")]
        public ExpandoObject DeleteMenu(Menu model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Menu = dataContext.Menus.Where(x => x.MenuId == model.MenuId).First();
                dataContext.Menus.DeleteOnSubmit(Menu);
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
        [Route("MenuUp")]
        public ExpandoObject MenuUp(Menu model)
        {
            dynamic response = new ExpandoObject();
            SchoolDataContext dataContext = new SchoolDataContext();
            DbTransaction transaction = null;
            int y = 0;
            try
            {
                dataContext.Connection.Open();
                transaction = dataContext.Connection.BeginTransaction();
                dataContext.Transaction = transaction;
                var Menu = dataContext.Menus.Where(x => x.MenuId == model.MenuId).First();
                int menuNo = Menu.MenuNo;
                var preMenu = dataContext.Menus.Where(x => (Menu.ParentMenuId.HasValue ? x.ParentMenuId == Menu.ParentMenuId : x.ParentMenuId == null) && x.MenuNo < Menu.MenuNo).OrderByDescending(x => x.MenuNo).First();
                Menu.MenuNo = preMenu.MenuNo;
                dataContext.SubmitChanges();

                preMenu.MenuNo = menuNo;
                dataContext.SubmitChanges();

                transaction.Commit();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (y != 1)
                    transaction.Rollback();
                response.Message = ex.Message;
            }
            finally
            {
                if (null != dataContext.Connection)
                    dataContext.Connection.Close();
            }
            return response;
        }

        [HttpPost]
        [Route("MenuDown")]
        public ExpandoObject MenuDown(Menu model)
        {
            dynamic response = new ExpandoObject();
            SchoolDataContext dataContext = new SchoolDataContext();
            DbTransaction transaction = null;
            int y = 0;
            try
            {
                dataContext.Connection.Open();
                transaction = dataContext.Connection.BeginTransaction();
                dataContext.Transaction = transaction;
                var Menu = dataContext.Menus.Where(x => x.MenuId == model.MenuId).First();
                int menuNo = Menu.MenuNo;

                var preMenu = dataContext.Menus.Where(x => (Menu.ParentMenuId.HasValue ? x.ParentMenuId == Menu.ParentMenuId : x.ParentMenuId == null) && x.MenuNo > Menu.MenuNo).OrderBy(x => x.MenuNo).First();
                Menu.MenuNo = preMenu.MenuNo;
                dataContext.SubmitChanges();

                preMenu.MenuNo = menuNo;
                dataContext.SubmitChanges();

                transaction.Commit();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (y != 1)
                    transaction.Rollback();
                response.Message = ex.Message;
            }
            finally
            {
                if (null != dataContext.Connection)
                    dataContext.Connection.Close();
            }
            return response;
        }

        [HttpPost]
        [Route("UserMenuList")]
        public ExpandoObject UserMenuList(StaffLogin model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var staffLoginRoles = dataContext.StaffLoginRoles.Where(x => x.StaffLoginId == model.StaffLoginId);
                var allMenuList = (from m1 in dataContext.RoleMenus
                                   join m2 in dataContext.Menus on m1.MenuId equals m2.MenuId
                                   where staffLoginRoles.Select(x => x.RoleId).Contains(m1.RoleId)
                                   select new { m1.MenuId, m2.ParentMenuId }).Distinct().ToList();


                var list = from d1 in dataContext.Menus
                           orderby d1.MenuNo
                           join d2 in dataContext.Pages on d1.PageId equals d2.PageId into subPages
                           where d1.ParentMenuId == null
                           && (allMenuList.Select(x => x.MenuId).Contains(d1.MenuId) || allMenuList.Select(x => x.ParentMenuId).Contains(d1.MenuId))
                           select new
                           {
                               d1.MenuId,
                               d1.PageId,
                               PageUrl = subPages.Any() ? subPages.First().PageUrl : null,
                               d1.MenuTitle,
                               d1.MenuNo,
                               d1.ParentMenuId,
                               d1.MenuIcon,
                               d1.Status,
                               MenuList = from t1 in dataContext.Menus
                                          orderby t1.MenuNo
                                          join t2 in dataContext.Pages on t1.PageId equals t2.PageId
                                          where t1.ParentMenuId == d1.MenuId
                                          && (allMenuList.Select(x => x.MenuId).Contains(t1.MenuId) || allMenuList.Select(x => x.ParentMenuId).Contains(t1.MenuId))
                                          select new
                                          {
                                              t1.MenuId,
                                              t1.PageId,
                                              t2.PageUrl,
                                              t1.MenuTitle,
                                              t1.MenuNo,
                                              t1.ParentMenuId,
                                              t1.MenuIcon,
                                              t1.Status,
                                          }
                           };

                ResponseMessage.MenuList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
        public class ValidiateMenuModel
        {
            public string Url { get; set; }
            public int StaffLoginId { get; set; }
        }

        [HttpPost]
        [Route("ValidiateMenu")]
        public ExpandoObject ValidiateMenu(ValidiateMenuModel model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var staffRoles = dataContext.StaffLoginRoles.Where(x => x.StaffLoginId == model.StaffLoginId).Select(x => x.RoleId).ToList();
                var menus = (from m1 in dataContext.RoleMenus
                             join m2 in dataContext.Menus on m1.MenuId equals m2.MenuId
                             join p1 in dataContext.Pages on m2.PageId equals p1.PageId
                             join r1 in dataContext.RoleMenus on m2.MenuId equals r1.MenuId
                             where staffRoles.Contains(m1.RoleId)
                             && p1.PageUrl == model.Url
                             select r1);
                if (menus.Any())
                {
                    var menu = menus.First();
                    ResponseMessage.Action = menus.Select(x => new { x.CanEdit, x.CanCreate, x.CanDelete }).First();
                    ResponseMessage.Message = ConstantData.SuccessMessage;
                }
                else
                    ResponseMessage.Message = ConstantData.AccessDenied;

            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}
