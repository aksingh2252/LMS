using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/State")]
    public class StateController : ApiController
    {
        [HttpPost]
        [Route("StateList")]
        public ExpandoObject StateList(State model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.States
                           where (model.StateId == d1.StateId || model.StateId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.StateName
                           select new
                           {
                               d1.StateId,
                               d1.StateName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.StateList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveState")]
        public ExpandoObject SaveState(State model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                State State = null;
                if (model.StateId > 0)
                {
                    State = dataContext.States.Where(x => x.StateId == model.StateId).First();
                    State.UpdatedBy = model.UpdatedBy;
                    State.UpdatedDate = model.UpdatedDate;
                }
                else
                    State = new State();

                State.StateName = model.StateName;
                State.Status = model.Status;

                if (State.StateId == 0)
                    dataContext.States.InsertOnSubmit(State);
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
        [Route("deleteState")]
        public ExpandoObject DeleteState(State model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var State = dataContext.States.Where(x => x.StateId == model.StateId).First();
                dataContext.States.DeleteOnSubmit(State);
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
