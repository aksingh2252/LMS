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

    [RoutePrefix("api/PurchaseNewsPaper")]
    public class PurchaseNewsPaperController : ApiController
    {
        [Route("PurchaseNewsPaperList")]
        [HttpPost]
        public ExpandoObject PurchaseNewsPaperList(PurchaseNewsPaper model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.PurchaseNewsPapers
                            join m1 in dataContext.NewsPapers on r1.NewsPaperId equals m1.NewsPaperId

                            select new
                            {
                                
                                r1.NewsPaperId,
                                m1.NewsPaperName,
                                r1.PurchaseNewsPaperId,
                                r1.PurchaseDate,
                                m1.Rate,
                                
                            });
                response.Message = ConstantData.SuccessMessage;
                response.PurchaseNewsPaperList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SavePurchaseNewsPaper")]
        [HttpPost]
        public ExpandoObject SavePurchaseNewsPaper(PurchaseNewsPaper model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                PurchaseNewsPaper cl = null;
                if (model.PurchaseNewsPaperId > 0)
                {
                    cl = dataContext.PurchaseNewsPapers.First(x => x.PurchaseNewsPaperId == model.PurchaseNewsPaperId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new PurchaseNewsPaper();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.NewsPaperId = model.NewsPaperId;
                cl.PurchaseDate = model.PurchaseDate;
               

                if (cl.PurchaseNewsPaperId == 0)
                    dataContext.PurchaseNewsPapers.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
        [Route("DeletePurchaseNewsPaper")]
        [HttpPost]
        public ExpandoObject DeletePurchaseNewsPaper(PurchaseNewsPaper obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                PurchaseNewsPaper cl = dataContext.PurchaseNewsPapers.First(c => c.PurchaseNewsPaperId == obj.PurchaseNewsPaperId);
                dataContext.PurchaseNewsPapers.DeleteOnSubmit(cl);
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
