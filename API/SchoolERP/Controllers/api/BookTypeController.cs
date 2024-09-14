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
    [RoutePrefix("api/BookType")]
    public class BookTypeController : ApiController
    {
        [Route("BookTypeList")]
        [HttpGet] 
        public ExpandoObject BookTypeList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from bt in dataContext.BookTypes
                            select new
                            {
                                bt.BookTypeId,
                                bt.BookTypeName,
                                bt.Status,
                                 StatusName = Enum.GetName(typeof(Status), bt.Status)
                            });
                response.BookTypeList = list.ToList();
                response.Message = ConstantData.SuccessMessage;


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }


        [Route("SaveBookType")]
        [HttpPost]
        public ExpandoObject SaveBookType (BookType obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookType bt = null;
                if (obj.BookTypeId > 0)
                {
                    bt = dataContext.BookTypes.First(x => x.BookTypeId == obj.BookTypeId);
                }
                else
                    bt = new BookType();
                bt.BookTypeId = obj.BookTypeId;
                bt.BookTypeName = obj.BookTypeName;
                bt.Status = obj.Status;
                bt.UpdatedBy = obj.UpdatedBy;
                bt.UpdatedDate = obj.UpdatedDate;
                if (bt.BookTypeId == 0)
                    dataContext.BookTypes.InsertOnSubmit(bt);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        [Route("DeleteBookType")]
        [HttpPost]
        public ExpandoObject DeleteBookType(BookType obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookType bt = dataContext.BookTypes.First(c => c.BookTypeId == obj.BookTypeId);
                dataContext.BookTypes.DeleteOnSubmit(bt);
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
