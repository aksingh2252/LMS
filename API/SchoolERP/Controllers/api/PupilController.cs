using SchoolClasses;
using System;
using System.Data.Common;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Pupil")]
    public class PupilController : ApiController
    {
        [HttpPost]
        [Route("AllSearchPupilList")]
        public ExpandoObject AllSearchPupilList(Pupil model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Pupils
                           orderby d1.PupilName
                           select new
                           {
                               d1.PupilId,
                               d1.PupilName,
                               d1.FatherName,
                               d1.AdmissionNo
                           };

                ResponseMessage.PupilList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("SearchPupilList")]
        public ExpandoObject SearchPupilList(Pupil model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Pupils
                           join a1 in dataContext.PupilAdmissions on d1.PupilId equals a1.PupilId
                           join s1 in dataContext.Sections on a1.SectionId equals s1.SectionId
                           join c1 in dataContext.Classes on s1.ClassId equals c1.ClassId
                           where a1.PupilAdmissionStatus == (byte)PupilAdmissionStatus.Active
                           orderby d1.PupilName
                           select new
                           {
                               d1.PupilId,
                               a1.PupilAdmissionId,
                               d1.PupilName,
                               d1.FatherName,
                               c1.ClassName,
                               s1.SectionName,
                               d1.AdmissionNo
                           };

                ResponseMessage.PupilList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        public class PupilListRequestModel
        {
            public int PupilId { get; set; }
            public int ClassId { get; set; }
            public int SectionId { get; set; }
            public int SessionId { get; set; }
            public byte AdmissionType { get; set; }
            public byte PupilTypeId { get; set; }
            public byte PupilStatus { get; set; }
        }

        [HttpPost]
        [Route("PupilList")]
        public ExpandoObject PupilList(PupilListRequestModel model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Pupils
                           join d2 in dataContext.PupilTypes on d1.PupilTypeId equals d2.PupilTypeId
                           join d3 in dataContext.Cities on d1.CorrespondenceCityId equals d3.CityId into subCrossCity
                           join d4 in dataContext.Cities on d1.PermanentCityId equals d4.CityId into subPermanentCity
                           join d5 in dataContext.PupilAdmissions on d1.PupilId equals d5.PupilId
                           join d6 in dataContext.Sessions on d5.SessionId equals d6.SessionId
                           join d7 in dataContext.Sections on d5.SectionId equals d7.SectionId
                           join c1 in dataContext.Classes on d7.ClassId equals c1.ClassId
                           where d5.SessionId == model.SessionId
                           && (model.PupilId == d1.PupilId || model.PupilId == 0)
                           && (model.ClassId == d7.ClassId || model.ClassId == 0)
                           && (model.SectionId == d5.SectionId || model.SectionId == 0)
                           && (model.AdmissionType == d5.AdmissionType || model.AdmissionType == 0)
                           && (model.PupilTypeId == d1.PupilTypeId || model.PupilTypeId == 0)
                           && (model.PupilStatus == d1.PupilStatus || model.PupilStatus == 0)
                           orderby d1.PupilName
                           select new
                           {
                               d1.PupilId,
                               d1.PupilTypeId,
                               d2.PupilTypeName,
                               d1.PupilName,
                               d1.AdmissionNo,
                               d1.DOB,
                               d1.Gender,
                               d1.FatherName,
                               d1.FatherOccupation,
                               d1.MotherName,
                               d1.MotherOccupation,
                               d1.FamilyAnnualIncome,
                               d1.GuardianMobileNo,


                               d1.CorrespondenceAddress,
                               CorrespondenceStateId = subCrossCity.Any() ? subCrossCity.First().StateId : 0,
                               d1.CorrespondenceCityId,
                               CorrespondenceCityName = subCrossCity.Any() ? subCrossCity.First().CityName : "",
                               d1.CorrespondencePinCode,

                               d1.PermanentAddress,
                               PermanentStateId = subPermanentCity.Any() ? subPermanentCity.First().StateId : 0,
                               d1.PermanentCityId,
                               PermanentCityName = subPermanentCity.Any() ? subPermanentCity.First().CityName : "",
                               d1.PermanentPinCode,


                               d1.Category,
                               d1.BloodGroup,
                               d1.Religion,
                               d1.Nationality,
                               d1.MobileNo,
                               d1.AlternateNo,
                               d1.Email,
                               d1.AadhaarNo,
                               d1.PreviousSchoolName,
                               d1.PreviousSchoolBoard,
                               d1.PreviousSchoolClass,
                               d1.PreviousSchoolMedium,
                               d1.PreviousSchoolTCNo,
                               d1.PreviousSchoolTCDate,
                               d1.Remarks,
                               d1.StudentPhoto,
                               d1.LoginPassword,
                               d1.JoinDate,
                               d1.PupilStatus,
                               PupilStatusName = Enum.GetName(typeof(PupilStatus), d1.PupilStatus),
                               GenderName = Enum.GetName(typeof(Gender), d1.Gender),
                               CategoryName = d1.Category.HasValue ? Enum.GetName(typeof(Category), d1.Category) : null,
                               BloodGroupName = d1.BloodGroup.HasValue ? Enum.GetName(typeof(BloodGroup), d1.BloodGroup) : null,
                               ReligionName = d1.Religion.HasValue ? Enum.GetName(typeof(Religion), d1.Religion) : null,
                               NationalityName = d1.Nationality.HasValue ? Enum.GetName(typeof(Nationality), d1.Nationality) : null,

                               PupilAdmission = new
                               {
                                   d5.PupilAdmissionId,
                                   d5.AdmissionType,
                                   d6.SessionName,
                                   d7.ClassId,
                                   c1.ClassName,
                                   d7.SectionId,
                                   d6.SessionId,
                                   d7.SectionName,
                                   d5.RollNo,
                                   d5.AdmissionDate,
                                   d5.LeaveDate,
                                   d5.Height,
                                   d5.Weight,
                                   d5.PupilAdmissionStatus,
                                   PupilAdmissionStatusName = Enum.GetName(typeof(PupilAdmissionStatus), d5.PupilAdmissionStatus),
                                   AdmissionTypeName = Enum.GetName(typeof(AdmissionType), d5.AdmissionType)
                               },
                           };

                ResponseMessage.PupilList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        public class PupilModel
        {
            public Pupil Pupil { get; set; }
            public PupilAdmission PupilAdmission { get; set; }
            public int StaffLoginId { get; set; }

        }

        [HttpPost]
        [Route("savePupil")]
        public ExpandoObject SavePupil(PupilModel model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            SchoolDataContext dataContext = new SchoolDataContext();
            DbTransaction transaction = null;
            int y = 0;
            try
            {
                dataContext.Connection.Open();
                transaction = dataContext.Connection.BeginTransaction();
                dataContext.Transaction = transaction;
                int classId = dataContext.Sections.First(x => x.SectionId == model.PupilAdmission.SectionId).ClassId;
                Pupil Pupil = null;
                if (model.Pupil.PupilId > 0)
                {
                    Pupil = dataContext.Pupils.Where(x => x.PupilId == model.Pupil.PupilId).First();
                    Pupil.UpdatedBy = model.StaffLoginId;
                    Pupil.UpdatedDate = DateTime.Now;
                }
                else
                {


                    Pupil = new Pupil();
                    Pupil.PupilStatus = (byte)PupilStatus.Active;
                    Pupil.JoinDate = model.PupilAdmission.AdmissionDate;
                    Pupil.CreatedBy = model.StaffLoginId;
                    Pupil.CreatedDate = DateTime.Now;
                }

                Pupil.PupilTypeId = model.Pupil.PupilTypeId;
                Pupil.PupilName = model.Pupil.PupilName;
                Pupil.AdmissionNo = model.Pupil.AdmissionNo;
                Pupil.DOB = model.Pupil.DOB;
                Pupil.Gender = model.Pupil.Gender;
                Pupil.FatherName = model.Pupil.FatherName;
                Pupil.FatherOccupation = model.Pupil.FatherOccupation;
                Pupil.MotherName = model.Pupil.MotherName;
                Pupil.MotherOccupation = model.Pupil.MotherOccupation;
                Pupil.FamilyAnnualIncome = model.Pupil.FamilyAnnualIncome;
                Pupil.GuardianMobileNo = model.Pupil.GuardianMobileNo;
                Pupil.CorrespondenceAddress = model.Pupil.CorrespondenceAddress;
                Pupil.CorrespondenceCityId = model.Pupil.CorrespondenceCityId;
                Pupil.CorrespondencePinCode = model.Pupil.CorrespondencePinCode;
                Pupil.PermanentAddress = model.Pupil.PermanentAddress;
                Pupil.PermanentCityId = model.Pupil.PermanentCityId;
                Pupil.PermanentPinCode = model.Pupil.PermanentPinCode;
                Pupil.Category = model.Pupil.Category;
                Pupil.BloodGroup = model.Pupil.BloodGroup;
                Pupil.Religion = model.Pupil.Religion;
                Pupil.Nationality = model.Pupil.Nationality;
                Pupil.MobileNo = model.Pupil.MobileNo;
                Pupil.AlternateNo = model.Pupil.AlternateNo;
                Pupil.Email = model.Pupil.Email;
                Pupil.AadhaarNo = model.Pupil.AadhaarNo;
                Pupil.PreviousSchoolName = model.Pupil.PreviousSchoolName;
                Pupil.PreviousSchoolBoard = model.Pupil.PreviousSchoolBoard;
                Pupil.PreviousSchoolClass = model.Pupil.PreviousSchoolClass;
                Pupil.PreviousSchoolMedium = model.Pupil.PreviousSchoolMedium;
                Pupil.PreviousSchoolTCNo = model.Pupil.PreviousSchoolTCNo;
                Pupil.PreviousSchoolTCDate = model.Pupil.PreviousSchoolTCDate;
                Pupil.Remarks = model.Pupil.Remarks;

                if (Pupil.PupilId == 0)
                {
                    dataContext.Pupils.InsertOnSubmit(Pupil);
                    dataContext.SubmitChanges();
                    //Check Admission Fee
                    var FeeAdmissionList = (from c1 in dataContext.FeeAdmissionHeads
                                            join f1 in dataContext.Heads
                                            on c1.HeadId equals f1.HeadId
                                            join cf1 in dataContext.FeeAdmissions
                                            on c1.FeeAdmissionHeadId equals cf1.FeeAdmissionHeadId
                                            where c1.ClassId == classId
                                            && c1.PupilTypeId == model.Pupil.PupilTypeId
                                            && c1.AdmissionType == (byte)AdmissionType.NewAdmission
                                            && c1.SessionId == model.PupilAdmission.SessionId
                                            && cf1.IsActive
                                            select new { c1.HeadId, cf1.FeeAmount, cf1.IsCompulsory, cf1.IsRefundable });
                    if (!FeeAdmissionList.Any())
                        throw new Exception("Admission fee is not set for selected class!!");

                    var session = dataContext.Sessions.First(x => x.SessionId == model.PupilAdmission.SessionId);
                    FeeAdmissionList.Where(x => x.FeeAmount > 0).ToList().ForEach(x1 =>
                    {
                        PupilCharge pupilCharge = new PupilCharge
                        {
                            ChargeDate = session.SessionStartDate,
                            CreatedBy = model.StaffLoginId,
                            CreatedDate = DateTime.Now,
                            FeeAmount = x1.FeeAmount,
                            FeeFor = (byte)FeeFor.AdmissionFee,
                            HeadId = x1.HeadId,
                            IsCompulsory = x1.IsCompulsory,
                            Remarks = "New Admission Fee",
                            PupilId = Pupil.PupilId,
                        };
                        dataContext.PupilCharges.InsertOnSubmit(pupilCharge);
                        dataContext.SubmitChanges();
                    });
                }
                else
                    dataContext.SubmitChanges();

                PupilAdmission PupilAdmission = null;
                if (model.PupilAdmission.PupilAdmissionId == 0)
                {
                    PupilAdmission = new PupilAdmission
                    {
                        CreatedDate = DateTime.Now,
                        CreatedBy = model.StaffLoginId,
                        PupilId = Pupil.PupilId,
                        PupilAdmissionStatus = (byte)PupilAdmissionStatus.Active,
                        AdmissionType = (byte)AdmissionType.NewAdmission

                };
                }
                else
                {
                    PupilAdmission = dataContext.PupilAdmissions.First(x => x.PupilAdmissionId == model.PupilAdmission.PupilAdmissionId);
                    PupilAdmission.UpdatedBy = model.StaffLoginId;
                    PupilAdmission.UpdatedDate = DateTime.Now;
                    PupilAdmission.AdmissionType = model.PupilAdmission.AdmissionType;
                }

                PupilAdmission.SessionId = model.PupilAdmission.SessionId;
                PupilAdmission.SectionId = model.PupilAdmission.SectionId;
                PupilAdmission.AdmissionDate = model.PupilAdmission.AdmissionDate;
                PupilAdmission.Height = model.PupilAdmission.Height;
                PupilAdmission.Weight = model.PupilAdmission.Weight;
                PupilAdmission.RollNo = model.PupilAdmission.RollNo;
                if (PupilAdmission.PupilAdmissionId == 0)
                    dataContext.PupilAdmissions.InsertOnSubmit(PupilAdmission);
                dataContext.SubmitChanges();

                transaction.Commit();
                y = 1;
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (y != 1)
                    transaction.Rollback();

                if (ex.Message.Contains("IX"))
                    ResponseMessage.Message = "This record is already exist";
                else
                    ResponseMessage.Message = ex.Message;
            }
            finally
            {
                if (null != dataContext.Connection)
                    dataContext.Connection.Close();
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("deletePupil")]
        public ExpandoObject DeletePupil(Pupil model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Pupil = dataContext.Pupils.Where(x => x.PupilId == model.PupilId).First();
                dataContext.Pupils.DeleteOnSubmit(Pupil);
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
