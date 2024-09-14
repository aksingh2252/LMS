using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Class")]
    public class ClassController : ApiController
    {
        [HttpPost]
        [Route("ClassStreamList")]
        public ExpandoObject ClassStreamList(Class model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Classes
                           join p2 in dataContext.Classes on d1.ParentClassId equals p2.ClassId
                           where (model.ClassId == d1.ClassId || model.ClassId == 0)
                           && (model.ParentClassId == null || model.ParentClassId == d1.ParentClassId)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby p2.ClassNo ascending, d1.ClassNo ascending
                           select new
                           {
                               d1.ClassId,
                               d1.ClassName,
                               ParentClassName = p2.ClassName,
                               d1.ClassNo,
                               d1.ParentClassId,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };
                ResponseMessage.ClassStreamList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("ClassList")]
        public ExpandoObject ClassList(Class model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Classes
                           join p2 in dataContext.Classes on d1.ClassId equals p2.ParentClassId into subChilds
                           where (model.ClassId == d1.ClassId || model.ClassId == 0)
                           && (d1.ParentClassId == null)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.ClassNo
                           select new
                           {
                               d1.ClassId,
                               d1.ClassName,
                               d1.ClassNo,
                               d1.ParentClassId,
                               Streams = subChilds.Select(x => x.ClassName).ToList(),
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };
                ResponseMessage.ClassList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("AllClassList")]
        public ExpandoObject AllClassList(Class model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var parentClassIds = dataContext.Classes.Select(x => x.ParentClassId ?? 0).Distinct().ToList();
                var list = from d1 in dataContext.Classes
                           join p2 in dataContext.Classes on d1.ParentClassId equals p2.ClassId into subParents
                           where !parentClassIds.Contains(d1.ClassId)
                           orderby d1.ClassNo
                           select new
                           {
                               d1.ClassId,
                               ClassName = subParents.Any() ? subParents.First().ClassName + " - " + d1.ClassName : d1.ClassName,
                               d1.ClassNo,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };
                ResponseMessage.ClassList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveClass")]
        public ExpandoObject SaveClass(Class model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Class Class = null;
                if (model.ClassId > 0)
                {
                    Class = dataContext.Classes.Where(x => x.ClassId == model.ClassId).First();
                    Class.UpdatedBy = model.UpdatedBy;
                    Class.UpdatedDate = DateTime.Now;
                }
                else
                    Class = new Class();

                Class.ClassName = model.ClassName;
                Class.ClassNo = model.ClassNo;
                Class.ParentClassId = model.ParentClassId;
                Class.Status = model.Status;

                if (Class.ClassId == 0)
                    dataContext.Classes.InsertOnSubmit(Class);
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
        [Route("deleteClass")]
        public ExpandoObject DeleteClass(Class model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Class = dataContext.Classes.Where(x => x.ClassId == model.ClassId).First();
                dataContext.Classes.DeleteOnSubmit(Class);
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
