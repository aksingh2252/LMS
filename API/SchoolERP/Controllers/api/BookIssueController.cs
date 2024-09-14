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
    [RoutePrefix("api/BookIssue")]
    public class BookIssueController : ApiController
    {
        [HttpPost]
        [Route("BookIssueList")]
        public ExpandoObject BookIssueList(BookIssue model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.BookIssues
                           join d2 in dataContext.Books on d1.BookId equals d2.BookId
                           where (model.BookIssueId == d1.BookIssueId || model.BookIssueId == 0)
                           orderby d1.IssueDate
                           select new
                           {
                               d1.BookIssueId,
                               d1.BookId,
                               d2.BookCount,
                               d2.BookName,
                               d1.StudentName,
                               d1.StaffId,
                               d1.IssueDate,
                               d1.ReturnDate,
                               d1.FineAmount,
                               d1.Remarks,
                               d1.IsReturned        
                           };

                ResponseMessage.BookIssueList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveBookIssue")]
        public ExpandoObject SaveBookIssue(BookIssue model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                BookIssue BookIssue = null;
                Book book = null;
                if (model.BookIssueId > 0)
                {
                    BookIssue = dataContext.BookIssues.Where(x => x.BookIssueId == model.BookIssueId).First();
                    BookIssue.UpdatedBy = model.UpdatedBy;
                    BookIssue.UpdatedDate = DateTime.Now;
                    BookIssue.IsReturned = model.IsReturned;
                }
                else
                {
                    BookIssue = new BookIssue();
                    BookIssue.IsReturned = false;
                }

                book = dataContext.Books.Where(x => x.BookId == model.BookId).First();



                BookIssue.StudentName = model.StudentName;
                BookIssue.BookId = model.BookId;
                BookIssue.StaffId = model.StaffId;
                BookIssue.IssueDate = model.IssueDate;
                BookIssue.ReturnDate = model.ReturnDate;
                BookIssue.FineAmount = model.FineAmount;
                BookIssue.Remarks = model.Remarks;

                if (model.IsReturned)
                {

                    book.BookCount += 1;
                }
                else
                {
                    if (book.BookCount != 0)
                        book.BookCount -= 1;
                    else
                    {
                        throw new Exception("Book Out of stock");

                    }

                }
             

                if (BookIssue.BookIssueId == 0)
                    dataContext.BookIssues.InsertOnSubmit(BookIssue);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("IX"))
                    ResponseMessage.Message = "This record is already exist";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("deleteBookIssue")]
        public ExpandoObject DeleteBookIssue(BookIssue model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var BookIssue = dataContext.BookIssues.Where(x => x.BookIssueId == model.BookIssueId).First();
                dataContext.BookIssues.DeleteOnSubmit(BookIssue);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("FK"))
                    ResponseMessage.Message = "This record is in use.so can't delete.";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}
