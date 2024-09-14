using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolClasses
{
    public class PupilPromotionModel
    {
        public List<PupilAdmissionModel> PupilAdmissionList { get; set; }
        public int StaffLoginId { get; set; }
        public int SessionId { get; set; }
    }
    public class PupilAdmissionModel
    {
        public int PupilAdmissionId { get; set; }
        public int PupilId { get; set; }
        public string AdmissionNo { get; set; }
        public string PupilName { get; set; }
        public int AdmissionType { get; set; }
        public int SessionId { get; set; }
        public string ClassName { get; set; }
        public string SectionName { get; set; }
        public int SectionId { get; set; }
        public int? RollNo { get; set; }
        public DateTime AdmissionDate { get; set; }
        public DateTime LeaveDate { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string DuePeriod { get; set; }
        public decimal TotalDueAmount { get; set; }
    }
    public class FeePaymentDetailModel
    {
        public int FeePaymentDetailId { get; set; }
        public bool IsCompulsory { get; set; }
        public int HeadId { get; set; }
        public string HeadName { get; set; }
        public byte FeeFor { get; set; }
        public decimal FeeAmount { get; set; }
        public decimal WaiveOffAmount { get; set; }
        public decimal TotalAmount { get { return FeeAmount - WaiveOffAmount; } }
        public string Remarks { get; set; }
        public int? PupilWaiveOffId { get; set; }
    }
    public class FeePaymentMonthModel
    {
        public bool IsSelected { get; set; }
        public int FeePaymentMonthId { get; set; }
        public int Year { get; set; }
        public int MonthId { get; set; }
        public DateTime Date { get; set; }
        public int Position { get; set; }
        public string MonthName { get; set; }
        public decimal TotalAmount { get; set; }
        public List<FeePaymentDetailModel> FeePaymentDetailList { get; set; }
    }

    public class FeeDueModel
    {
        public int PupilAdmissionId { get; set; }
        public string PupilName { get; set; }
        public string AdmissionNo { get; set; }
        public string ClassName { get; set; }
        public string SectionName { get; set; }
        public string DuePeriod { get; set; }
        public decimal AdmissionFee { get; set; }
        public decimal ClassFee { get; set; }
        public decimal RegistrationFee { get; set; }
        public decimal TransportFee { get; set; }
        public decimal Fine { get; set; }
        public decimal OtherCharges { get; set; }
        public decimal TotalAmount { get { return AdmissionFee + ClassFee + RegistrationFee + TransportFee + Fine + OtherCharges; } }
    }


    public class FilterModel
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int Id { get; set; }
        public int PupilId { get; set; }
        public int PupilAdmissionId { get; set; }
        public int UpToMonthPosition { get; set; }
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public int SessionId { get; set; }
        public byte FeePaymentStatus { get; set; }
    }
}
