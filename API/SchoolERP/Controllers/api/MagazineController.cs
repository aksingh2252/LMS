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
    [RoutePrefix("api/Magazine")]
    public class MagazineController : ApiController
    {
        [Route("MagazineList")]
        [HttpPost]
        public ExpandoObject MagazineList(Magazine model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Magazines

                            select new
                            {
                                r1.MagazineName,
                                r1.MagazineId,
                                r1.Status,
                                r1.Rate,
                                StatusName = Enum.GetName(typeof(Status), r1.Status)
                            });
                response.Message = ConstantData.SuccessMessage;
                response.MagazineList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }
        [Route("SaveMagazine")]
        [HttpPost]
        public ExpandoObject SaveMagazine(Magazine model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Magazine cl = null;
                if (model.MagazineId > 0)
                {
                    cl = dataContext.Magazines.First(x => x.MagazineId == model.MagazineId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new Magazine();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.MagazineName = model.MagazineName;
                cl.Status = model.Status;


                if (cl.MagazineId == 0)
                    dataContext.Magazines.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
        [Route("DeleteMagazine")]
        [HttpPost]
        public ExpandoObject DeleteMagazine(Magazine obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Magazine cl = dataContext.Magazines.First(c => c.MagazineId == obj.MagazineId);
                dataContext.Magazines.DeleteOnSubmit(cl);
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
