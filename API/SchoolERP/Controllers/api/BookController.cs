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
    [RoutePrefix("api/Book")]
    public class BookController : ApiController
    {
        [Route("BookList")]
        [HttpGet]
        public ExpandoObject BookList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();

                var list = (from r1 in dataContext.Books
                            join m1 in dataContext.BookTypes on r1.BookTypeId equals m1.BookTypeId
                            select new
                            {
                                r1.BookId,
                                r1.BookName,
                                r1.AuthorName,
                                r1.Edition,
                                r1.Publisher,
                                r1.PublishingYear,
                                r1.TotalPages,
                                r1.Volume,
                                r1.BookTypeId, 
                                m1.BookTypeName,
                                r1.BookCount
                            });
                response.Message = ConstantData.SuccessMessage;
                response.BookList = list.ToList();

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("AuthorList")]
        [HttpGet]
        public ExpandoObject AuthorList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Books
                            select r1.AuthorName).Distinct().ToList();
                response.AuthorList = list;
                response.Message = ConstantData.SuccessMessage;
            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("EditionList")]
        [HttpGet]
        public ExpandoObject EditionList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Books
                            select r1.Edition).Distinct().ToList();
                response.EditionList = list;
                response.Message = ConstantData.SuccessMessage;
            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("PublisherList")] 
        [HttpGet]
        public ExpandoObject PublisherList()
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = (from r1 in dataContext.Books
                            select r1.Publisher).Distinct().ToList();
                response.PublisherList = list;
                response.Message = ConstantData.SuccessMessage;
            }

            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }

        [Route("SaveBook")]
        [HttpPost]
        public ExpandoObject SaveBook(Book model)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Book cl = null;
                if (model.BookId > 0)
                {
                    cl = dataContext.Books.First(x => x.BookId == model.BookId);
                    cl.UpdatedBy = model.UpdatedBy;
                    cl.UpdatedDate = DateTime.Now;
                }
                else
                {
                    cl = new Book();
                    cl.CreatedBy = model.CreatedBy;
                    cl.CreatedDate = DateTime.Now;
                }

                cl.BookName = model.BookName;
                cl.AuthorName = model.AuthorName;
                cl.Edition = model.Edition;
                cl.Publisher = model.Publisher;
                cl.PublishingYear = model.PublishingYear;
                cl.TotalPages = model.TotalPages;
                cl.Volume = model.Volume;
                cl.BookTypeId = model.BookTypeId;
                cl.BookCount = model.BookCount;

                if (cl.BookId == 0)
                    dataContext.Books.InsertOnSubmit(cl);
                dataContext.SubmitChanges();
                response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }


        [Route("DeleteBook")]
        [HttpPost]
        public ExpandoObject DeleteBook(Book obj)
        {
            dynamic response = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Book cl = dataContext.Books.First(c => c.BookId == obj.BookId);
                dataContext.Books.DeleteOnSubmit(cl);
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
