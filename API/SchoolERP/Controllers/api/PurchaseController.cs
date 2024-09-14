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
    [RoutePrefix("api/Purchase")]
    public class PurchaseController : ApiController
    {
        [Route("PurchaseList")]
        [HttpPost]
        public ExpandoObject PurchaseList(Purchase model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Purchases
                            join m1 in dataContext.Suppliers on r1.SupplierId equals m1.SupplierId
                            select new
                            {
                                r1.PurchaseId,
                                r1.InvoiceNo,
                                r1.InvoiceDate,
                                r1.BaseAmount,
                                r1.DiscountAmount,
                                r1.TaxableAmount,
                                r1.CGSTAmount,
                                r1.SGSTAmount,
                                r1.IGSTAmount,
                                r1.GrossAmount,
                                r1.SupplierId,
                                m1.SupplierName,
                                


                            });
                response.Message = ConstantData.SuccessMessage;
                response.PurchaseList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SavePurchase")]
        [HttpPost]
        public ExpandoObject SavePurchase(Purchase model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Purchase cl = null;
                if (model.PurchaseId > 0)
                {
                    cl = dataContext.Purchases.First(x => x.PurchaseId == model.PurchaseId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new Purchase();
                    cl.CreatedBy = model.CreatedBy;
                    cl.CreatedDate = DateTime.Now;
                }

                cl.PurchaseId = model.PurchaseId;
                cl.InvoiceNo   = model.InvoiceNo;
                cl.InvoiceDate = model.InvoiceDate;
                cl.BaseAmount = model.BaseAmount;
                cl.DiscountAmount = model.DiscountAmount;
                cl.TaxableAmount = model.TaxableAmount;
                cl.CGSTAmount = model.CGSTAmount;
                cl.SGSTAmount = model.SGSTAmount;
                cl.IGSTAmount = model.IGSTAmount;
                cl.GrossAmount = model.GrossAmount;



                if (cl.PurchaseId == 0)
                    dataContext.Purchases.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;

        }
        [Route("deletePurchase")]
        [HttpPost]
        public ExpandoObject deletePurchase(Purchase obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Purchase cl = dataContext.Purchases.First(c => c.PurchaseId == obj.PurchaseId);
                dataContext.Purchases.DeleteOnSubmit(cl);
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
