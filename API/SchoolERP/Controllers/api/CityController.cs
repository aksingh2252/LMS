using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/City")]
    public class CityController : ApiController
    {
        [HttpPost]
        [Route("CityList")]
        public ExpandoObject CityList(City model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Cities
                           join d2 in dataContext.States on d1.StateId equals d2.StateId
                           where (model.CityId == d1.CityId || model.CityId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.CityName
                           select new
                           {
                               d1.CityId,
                               d1.CityName,
                               d2.StateId,
                               d2.StateName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.CityList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveCity")]
        public ExpandoObject SaveCity(City model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                City City = null;
                if (model.CityId > 0)
                {
                    City = dataContext.Cities.Where(x => x.CityId == model.CityId).First();
                    City.UpdatedBy = model.UpdatedBy;
                    City.UpdatedDate = DateTime.Now;
                }
                else
                    City = new City();

                City.CityName = model.CityName;
                City.StateId = model.StateId;
                City.Status = model.Status;

                if (City.CityId == 0)
                    dataContext.Cities.InsertOnSubmit(City);
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
        [Route("deleteCity")]
        public ExpandoObject DeleteCity(City model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var City = dataContext.Cities.Where(x => x.CityId == model.CityId).First();
                dataContext.Cities.DeleteOnSubmit(City);
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
