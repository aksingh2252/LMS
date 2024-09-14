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
    [RoutePrefix("api/BookDetail")]
    public class BookDetailController : ApiController
    {
        [Route("BookDetail")]
        [HttpPost]
        public ExpandoObject BookDetail(BookDetail model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.BookDetails
                            join m1 in dataContext.Books on r1.BookId equals m1.BookId
                            join m2 in dataContext.BookDetails on r1.BookDetailsId equals m2.BookDetailsId
                            select new
                            {
                                r1.BookId,
                                m1.BookName,
                            

                            });
                response.Message = ConstantData.SuccessMessage;
                response.BookDetailList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }


    }
}
