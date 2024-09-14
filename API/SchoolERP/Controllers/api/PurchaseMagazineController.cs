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
    [RoutePrefix("api/PurchaseMagazine")]
    public class PurchaseMagazineController : ApiController
    {
        [Route("PurchaseMagazineList")]
        [HttpPost]
        public ExpandoObject PurchaseMagazineList(PurchaseMagazine model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.PurchaseMagazines
                            join r2 in dataContext.Magazines on r1.MagazineId equals r2.MagazineId
                            join r3 in dataContext.Languages on r1.LanguageId equals r3.LanguageId
                            select new
                            {
                      
                                r1.PurchaseMagazineId,
                                r1.MagazineId,
                                r2.MagazineName,
                                r1.PublicDate,
                                r1.ReceiveDate,
                                r1.ReceiveSource,
                                r1.LanguageId,
                                r3.LanguageName,
                                r1.Remarks,
                                r1.Rate,
                            });
                response.Message = ConstantData.SuccessMessage;
                response.PurchaseMagazineList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }
        [Route("SavePurchaseMagazine")]
        [HttpPost]
        public ExpandoObject SavePurchaseMagazine(PurchaseMagazine model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                PurchaseMagazine cl = null;
                if (model.PurchaseMagazineId > 0)
                {
                    cl = dataContext.PurchaseMagazines.First(x => x.PurchaseMagazineId == model.PurchaseMagazineId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new PurchaseMagazine();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.MagazineId = model.MagazineId;
                cl.PublicDate = model.PublicDate;
                cl.ReceiveDate = model.ReceiveDate;
                cl.LanguageId = model.LanguageId;
                cl.Remarks = model.Remarks;
                cl.ReceiveSource = model.ReceiveSource;
                cl.Rate = model.Rate;



                if (cl.PurchaseMagazineId == 0)
                    dataContext.PurchaseMagazines.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
        [Route("DeletePurchaseMagazine")]
        [HttpPost]
        public ExpandoObject DeletePurchaseMagazine(PurchaseMagazine obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                PurchaseMagazine cl = dataContext.PurchaseMagazines.First(c => c.PurchaseMagazineId == obj.PurchaseMagazineId);
                dataContext.PurchaseMagazines.DeleteOnSubmit(cl);
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
