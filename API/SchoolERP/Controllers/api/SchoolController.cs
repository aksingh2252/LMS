using SchoolClasses;
using System;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/School")]
    public class SchoolController : ApiController
    {
        [HttpPost]
        [Route("SchoolList")]
        public ExpandoObject SchoolList(School model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Schools
                           where (model.SchoolId == d1.SchoolId || model.SchoolId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.SchoolName
                           select new
                           {
                               d1.SchoolId,
                               d1.SchoolName,
                               d1.ShortName,
                               d1.Location,
                               d1.FullAddress,
                               d1.SchoolSlogan,
                               d1.AffiliationDetail,
                               d1.AffiliationNo,
                               d1.SchoolCode,
                               d1.WebsiteUrl,
                               d1.Email,
                               d1.MobileNo,
                               d1.AlternateNo,
                               d1.LogoPng,
                               d1.LogoJpg,
                               d1.CreatedBy,
                               d1.CreatedDate,
                               d1.UpdatedBy,
                               d1.UpdatedDate,
                               d1.Status,

                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.SchoolList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveSchool")]
        public ExpandoObject SaveSchool(School model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                School School = null;
                if (model.SchoolId > 0)
                {
                    School = dataContext.Schools.Where(x => x.SchoolId == model.SchoolId).First();
                    School.UpdatedBy = model.UpdatedBy;
                    School.UpdatedDate = DateTime.Now;
                }
                else
                {
                    School = new School();
                    School.CreatedBy = model.CreatedBy;
                    School.CreatedDate = DateTime.Now;

                }
                School.SchoolName = model.SchoolName;
                School.ShortName = model.ShortName;
                School.Location = model.Location;
                School.FullAddress = model.FullAddress;
                School.SchoolSlogan = model.SchoolSlogan;
                School.AffiliationDetail = model.AffiliationDetail;
                School.AffiliationNo = model.AffiliationNo;
                School.SchoolCode = model.SchoolCode;
                School.WebsiteUrl = model.WebsiteUrl;
                School.Email = model.Email;
                School.MobileNo = model.MobileNo;
                School.AlternateNo = model.AlternateNo;
                School.Status = model.Status;

                if (!string.IsNullOrEmpty(model.LogoPng) && model.LogoPng != School.LogoPng)
                {
                    var path = HttpContext.Current.Server.MapPath("~/photos/");
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);
                    string pic = Guid.NewGuid() + ".png";
                    byte[] imageBytes = Convert.FromBase64String(model.LogoPng.ToString());

                    var fileStream = new FileStream(path + pic, FileMode.Create, FileAccess.ReadWrite);
                    fileStream.Write(imageBytes, 0, imageBytes.Length);
                    fileStream.Close();

                    School.LogoPng = "/photos/" + pic;
                    //School.LogoPng = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority)+ "/photos/" + pic;
                }

                if (!string.IsNullOrEmpty(model.LogoJpg) && model.LogoJpg != School.LogoJpg)
                {
                    var path = HttpContext.Current.Server.MapPath("~/photos/");
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);


                    string pic = Guid.NewGuid() + ".jpg";
                    byte[] imageBytes = Convert.FromBase64String(model.LogoJpg.ToString());

                    var fileStream = new FileStream(path + pic, FileMode.Create, FileAccess.ReadWrite);
                    fileStream.Write(imageBytes, 0, imageBytes.Length);
                    fileStream.Close();

                    School.LogoJpg = "/photos/" + pic;
                }

                if (School.SchoolId == 0)
                    dataContext.Schools.InsertOnSubmit(School);
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
        [Route("deleteSchool")]
        public ExpandoObject DeleteSchool(School model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var School = dataContext.Schools.Where(x => x.SchoolId == model.SchoolId).First();
                dataContext.Schools.DeleteOnSubmit(School);
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
