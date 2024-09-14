using SchoolClasses;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Rack")]
    public class RackController : ApiController
    {
        [Route("RackList")]
        [HttpGet]
        public ExpandoObject RackList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Racks
                            select new
                            {
                                r1.RackId,
                                r1.RackNo,
                                r1.Status,
                                StatusName = Enum.GetName(typeof(Status), r1.Status)
                            });
                response.Message = ConstantData.SuccessMessage;
                response.RackList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        [Route("SaveRack")]
        [HttpPost]
        public ExpandoObject SaveRack(Rack obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Rack cl = null;
                if (obj.RackId > 0)
                {
                    cl = dataContext.Racks.First(x => x.RackId == obj.RackId);
                    cl.UpdatedBy = obj.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                    cl = new Rack();
//                cl.RackId = obj.RackId;
                cl.RackNo = obj.RackNo;
                cl.Status = obj.Status;
                
               

                if (cl.RackId == 0)
                    dataContext.Racks.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        [Route("DeleteRack")]
        [HttpPost]
        public ExpandoObject DeleteRack(Rack obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Rack cl = dataContext.Racks.First(c => c.RackId == obj.RackId);
                dataContext.Racks.DeleteOnSubmit(cl);
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
