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
    [RoutePrefix("api/Supplier")]
    public class SupplierController : ApiController
    {
        [Route("SupplierList")]
        [HttpPost]
        public ExpandoObject SupplierList(Supplier model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Suppliers
                            join m1 in dataContext.Cities on r1.CityId equals m1.CityId
                          
                            select new
                            {
                                r1.SupplierId,
                                r1.SupplierName,
                                r1.MobileNo,
                                r1.Email,
                                r1.GSTNo,
                                r1.Address,
                                r1.SupplierFor,
                                r1.Status,
                                r1.CityId,
                                m1.CityName,
                                StatusName = Enum.GetName(typeof(Status), r1.Status)


                            });
                response.Message = ConstantData.SuccessMessage;
                response.SupplierList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SaveSupplier")]
        [HttpPost]
        public ExpandoObject SaveSupplier(Supplier model) 
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Supplier cl = null;
                if (model.SupplierId > 0)
                {
                    cl = dataContext.Suppliers.First(x => x.SupplierId == model.SupplierId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new Supplier();
                    cl.CreatedBy = model.CreatedBy;
                    cl.CreatedDate = DateTime.Now;
                }

       
                cl.SupplierName = model.SupplierName;
                cl.MobileNo = model.MobileNo;
                cl.Email = model.Email;
                cl.GSTNo = model.GSTNo;
                cl.CityId = model.CityId;
                cl.Address = model.Address;
                cl.SupplierFor = model.SupplierFor;
                cl.Status = model.Status;



                if (cl.SupplierId == 0)
                    dataContext.Suppliers.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;

        }
        [Route("deleteSupplier")]
        [HttpPost]
        public ExpandoObject deleteSupplier(Supplier obj) 
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Supplier cl = dataContext.Suppliers.First(c => c.SupplierId == obj.SupplierId);
                dataContext.Suppliers.DeleteOnSubmit(cl);
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