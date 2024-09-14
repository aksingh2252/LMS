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
    [RoutePrefix("api/BookSubject")]
    public class BookSubjectController : ApiController
    {
        [Route("BookSubjectList")]
        [HttpPost]
        public ExpandoObject BookSubjectList(BookSubject model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.BookSubjects
                            join m1 in dataContext.Books on r1.BookId equals m1.BookId
                            join m2 in dataContext.Subjects on r1.SubjectId equals m2.SubjectId
                            select new
                            {
                                r1.BookId,
                                m1.BookName, 
                                r1.SubjectId,
                                m2.SubjectName
                            });
                response.Message = ConstantData.SuccessMessage;
                response.BookSubjectList = list.ToList();


            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SaveBookSubject")]
        [HttpPost]
        public ExpandoObject SaveBookSubject(BookSubject model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookSubject cl = null;
                if (model.BookSubjectId > 0)
                {
                    cl = dataContext.BookSubjects.First(x => x.BookSubjectId == model.BookSubjectId);
                    //cl.UpdatedBy = model.UpdatedBy;
                    //cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new BookSubject();
                    //cl.CreatedBy = model.CreatedBy;
                    //cl.CreatedDate = DateTime.Now;
                }

                cl.BookId = model.BookId;
                cl.SubjectId = model.SubjectId;
                


                if (cl.BookSubjectId == 0)
                    dataContext.BookSubjects.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }


        [Route("DeleteBookSubject")]
        [HttpPost]
        public ExpandoObject DeleteBookSubject(BookSubject obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookSubject cl = dataContext.BookSubjects.First(c => c.BookSubjectId == obj.BookSubjectId);
                dataContext.BookSubjects.DeleteOnSubmit(cl);
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
