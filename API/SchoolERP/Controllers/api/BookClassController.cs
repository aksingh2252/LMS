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
    [RoutePrefix("api/BookClass")]
    public class BookClassController : ApiController
    {
        [Route("BookClassList")]
        [HttpPost]
        public ExpandoObject BookClass(BookClass model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.BookClasses
                            join m1 in dataContext.Books on r1.BookId equals m1.BookId
                            join m2 in dataContext.Classes on r1.ClassId equals m2.ClassId
                            select new
                            {
                                r1.BookId,
                                m1.BookName,
                                r1.ClassId,
                                m2.ClassName
                            });
                response.Message = ConstantData.SuccessMessage;
                response.BookClassList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SaveBookClass")]
        [HttpPost]
        public ExpandoObject SaveBookClass(BookClass model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookClass cl = null;
                if (model.BookClassId > 0)
                {
                    cl = dataContext.BookClasses.First(x => x.BookClassId == model.BookClassId);
                    //cl.UpdatedBy = model.UpdatedBy;
                    //cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new BookClass();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.BookId = model.BookId;
                cl.ClassId = model.ClassId;



                if (cl.BookClassId == 0)
                    dataContext.BookClasses.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        [Route("DeleteBookClass")]
        [HttpPost]
        public ExpandoObject DeleteBookClass(BookClass obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookClass cl = dataContext.BookClasses.First(c => c.BookClassId == obj.BookClassId);
                dataContext.BookClasses.DeleteOnSubmit(cl);
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
