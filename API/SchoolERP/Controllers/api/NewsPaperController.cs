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
    [RoutePrefix("api/NewsPaper")]
    public class NewsPaperController : ApiController
    {
        [Route("NewsPaperList")] 
        [HttpPost]
        public ExpandoObject NewsPaperList(NewsPaper model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.NewsPapers
                            
                            select new
                            {
                                r1.NewsPaperName,
                                r1.NewsPaperId,
                                r1.Status,
                                r1.Rate,
                                  StatusName = Enum.GetName(typeof(Status), r1.Status)
                            });
                response.Message = ConstantData.SuccessMessage;
                response.NewsPaperList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }
        [Route("SaveNewsPaper")]
        [HttpPost]
        public ExpandoObject SaveNewsPaper(NewsPaper model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                NewsPaper cl = null;
                if (model.NewsPaperId > 0)
                {
                    cl = dataContext.NewsPapers.First(x => x.NewsPaperId == model.NewsPaperId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new NewsPaper();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.NewsPaperName = model.NewsPaperName;
                cl.Status = model.Status;
                cl.Rate = model.Rate;



                if (cl.NewsPaperId == 0)
                    dataContext.NewsPapers.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
        [Route("DeleteNewsPaper")]
        [HttpPost]
        public ExpandoObject DeleteNewsPaper(NewsPaper obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                NewsPaper cl = dataContext.NewsPapers.First(c => c.NewsPaperId == obj.NewsPaperId);
                dataContext.NewsPapers.DeleteOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception eX)
            {
                response.Message = eX.Message;

            }
            return response;

        }

    }
}
