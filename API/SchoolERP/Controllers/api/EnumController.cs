using SchoolClasses;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/enum")]
    public class EnumController : ApiController
    {
        public class StatusModel
        {
            public int Key { get; set; }
            public string Value { get; set; }
        }

        [HttpPost]
        [Route("GenderList")]
        public ExpandoObject GenderList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Gender)).Cast<Gender>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Gender), x), "[A-Z]", " $0") }));
                Response.GenderList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("CategoryList")]
        public ExpandoObject CategoryList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Category)).Cast<Category>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Category), x), "[A-Z]", " $0") }));
                Response.CategoryList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("PaymentModeList")]
        public ExpandoObject PaymentModeList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(PaymentMode)).Cast<PaymentMode>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(PaymentMode), x), "[A-Z]", " $0") }));
                Response.PaymentModeList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("StatusList")]
        public ExpandoObject StatusList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Status)).Cast<Status>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Status), x), "[A-Z]", " $0") }));
                Response.StatusList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }


        [HttpPost]
        [Route("StaffTypeList")]
        public ExpandoObject StaffTypeList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(StaffType)).Cast<StaffType>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(StaffType), x), "[A-Z]", " $0") }));
                Response.StaffTypeList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }


        [HttpPost]
        [Route("AdmissionTypeList")]
        public ExpandoObject AdmissionTypeList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(AdmissionType)).Cast<AdmissionType>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(AdmissionType), x), "[A-Z]", " $0") }));
                Response.AdmissionTypeList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("BloodGroupList")]
        public ExpandoObject BloodGroupList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(BloodGroup)).Cast<BloodGroup>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = (System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(BloodGroup), x), "[A-Z]", " $0")).Replace("Positive","+").Replace("Negative","-") }));
                Response.BloodGroupList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("ReligionList")]
        public ExpandoObject ReligionList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Religion)).Cast<Religion>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Religion), x), "[A-Z]", " $0") }));
                Response.ReligionList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("NationalityList")]
        public ExpandoObject NationalityList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Nationality)).Cast<Nationality>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Nationality), x), "[A-Z]", " $0") }));
                Response.NationalityList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }


        [HttpPost]
        [Route("FeeForList")]
        public ExpandoObject FeeForList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(FeeFor)).Cast<FeeFor>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(FeeFor), x), "[A-Z]", " $0") }));
                Response.FeeForList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }


    }
}
