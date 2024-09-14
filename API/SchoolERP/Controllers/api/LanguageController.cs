using SchoolClasses;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Language")]
    public class LanguageController : ApiController
    {

        [HttpPost]
        [Route("LanguageList")]
        public ExpandoObject LanguageList(Language model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Languages
                           where (model.LanguageId == d1.LanguageId || model.LanguageId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.LanguageName
      
                           select new
                           {
                               d1.LanguageId,
                   
                               d1.LanguageName,
                    
                               d1.Status,
                      
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.LanguageList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveLanguage")]
        public ExpandoObject SaveLanguage(Language model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Language Language = null;
                if (model.LanguageId > 0)
                {
                    Language = dataContext.Languages.Where(x => x.LanguageId == model.LanguageId).First();
                    Language.UpdatedBy = model.UpdatedBy;
                    Language.UpdatedDate = DateTime.Now;
                }
                else
                    Language = new Language();
              
                Language.LanguageName = model.LanguageName;
                Language.Status = model.Status;

                if (Language.LanguageId == 0)
                    dataContext.Languages.InsertOnSubmit(Language);
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
        [Route("deleteLanguage")]
        public ExpandoObject DeleteLanguage(Language model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Language = dataContext.Languages.Where(x => x.LanguageId == model.LanguageId).First();
                dataContext.Languages.DeleteOnSubmit(Language);
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
