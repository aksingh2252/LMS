using SchoolClasses;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design.Serialization;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/BookFine")]
    public class BookFineController : ApiController
    {

        [HttpPost]
        [Route("BookFineList")]
        public ExpandoObject BookFineList(BookFine model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
               

                var fine = from d1 in dataContext.BookFines
                           join d2 in dataContext.Books on d1.BookId equals d2.BookId
                           join d3 in dataContext.BookIssues on d1.BookIssueId equals d3.BookIssueId
                           select new
                           {
                               d1.BookFineId,
                               d1.BookId,
                               d2.BookName,
                               d1.FineAmount,
                               d1.BookIssueId,
                               d3.StudentName,
                               d3.IssueDate,
                               d3.ReturnDate,
                               d1.Paid,
                               d1.DueDays,
                               d1.PayableAmount
                           };


                ResponseMessage.BookFineList = fine.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveBookFine")]
        public ExpandoObject SaveBookFine(BookFine model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {

                SchoolDataContext dataContext = new SchoolDataContext();
                var issues = from d1 in dataContext.BookIssues
                             join d2 in dataContext.Books on d1.BookId equals d2.BookId
                             where d1.ReturnDate.AddDays(1) < DateTime.Now
                             select new
                             {
                                 d1.BookId,
                                 d2.BookName,
                                 d1.BookIssueId,
                                 d1.StudentName,
                                 d1.IssueDate,
                                 d1.ReturnDate,
                                 d1.FineAmount,
                                 DueDays = (DateTime.Now - d1.ReturnDate).Days,
                                 PayableAmount = d1.FineAmount * (DateTime.Now - d1.ReturnDate).Days
                             };

                var issuesWithFine = issues.ToList();
                foreach (var record in issuesWithFine)
                {
                    BookFine fine = new BookFine();


                    if (!dataContext.BookFines.Any(x => x.BookIssueId == record.BookIssueId))
                    {

                        fine.BookId = record.BookId;
                        fine.FineAmount = record.FineAmount;
                        fine.BookIssueId = record.BookIssueId;
                        fine.DueDays = record.DueDays;
                        fine.PayableAmount = record.PayableAmount;

                        dataContext.BookFines.InsertOnSubmit(fine);
                    }
                    dataContext.SubmitChanges();
                }
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
        [Route("deleteBookFine")]
        public ExpandoObject DeleteBookFine(BookFine model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var BookFine = dataContext.BookFines.Where(x => x.BookFineId == model.BookFineId).First();
                dataContext.BookFines.DeleteOnSubmit(BookFine);
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
