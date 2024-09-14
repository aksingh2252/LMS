using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Staff")]
    public class StaffController : ApiController
    {
        [HttpPost]
        [Route("StaffList")]
        public ExpandoObject StaffList(Staff model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Staffs
                           where (model.StaffId == d1.StaffId || model.StaffId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.StaffName
                           join d2 in dataContext.Designations on d1.DesignationId equals d2.DesignationId
                           join d3 in dataContext.Departments on d1.DepartmentId equals d3.DepartmentId
                           select new
                           {
                               d1.StaffId,
                               d1.StaffName,
                               d1.StaffCode,
                               d1.Status,
                               d1.DesignationId,
                               d2.DesignationName,
                               d1.StaffType,
                               d1.FatherName,
                               d1.MobileNo,
                               d1.AlternateNo,
                               d1.Email,
                               d1.Gender,
                               d1.StaffPhoto,
                               d1.Qualification,
                               d1.FullAddress,
                               d1.JoinDate,
                               d1.DepartmentId,
                               d3.DepartmentName,
                               d1.UpdatedBy,
                               d1.UpdatedDate,
                               d1.CreatedBy,
                               d1.CreatedDate,
                               d1.DOB,

                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                               StaffTypeName = Enum.GetName(typeof(StaffType), d1.StaffType),
                               GenderName = Enum.GetName(typeof(Gender), d1.Gender),
                           };

                ResponseMessage.StaffList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveStaff")]
        public ExpandoObject SaveStaff(Staff model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Staff Staff = null;
                if (model.StaffId > 0)
                {
                    Staff = dataContext.Staffs.Where(x => x.StaffId == model.StaffId).First();
                    Staff.UpdatedBy = model.UpdatedBy;
                    Staff.UpdatedDate = DateTime.Now;
                }
                else
                {
                    Staff = new Staff();
                    Staff.CreatedBy = model.CreatedBy;
                    Staff.CreatedDate = DateTime.Now;
                    Staff.StaffCode = AppData.GenerateStaffCode(dataContext);
                }

                Staff.StaffName = model.StaffName;
                Staff.Status = model.Status;
                Staff.DesignationId = model.DesignationId;
                Staff.StaffType = model.StaffType;
                Staff.FatherName = model.FatherName;
                Staff.MobileNo = model.MobileNo;
                Staff.AlternateNo = model.AlternateNo;
                Staff.Email = model.Email;
                Staff.Gender = model.Gender;
                Staff.StaffPhoto = model.StaffPhoto;
                Staff.Qualification = model.Qualification;
                Staff.FullAddress = model.FullAddress;
                Staff.JoinDate = model.JoinDate;
                Staff.DepartmentId = model.DepartmentId;
                Staff.DOB = model.DOB;

                if (Staff.StaffId == 0)
                    dataContext.Staffs.InsertOnSubmit(Staff);
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
        [Route("deleteStaff")]
        public ExpandoObject DeleteStaff(Staff model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Staff = dataContext.Staffs.Where(x => x.StaffId == model.StaffId).First();
                dataContext.Staffs.DeleteOnSubmit(Staff);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("FK"))
                    ResponseMessage.Message = "This record is in use. so can't delete.";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}
