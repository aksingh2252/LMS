using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolClasses
{
    public enum RegistrationStatus
    {
        Pending = 1,
        Registred = 2,
        Admitted = 3
    }
    public enum Months
    {
        January = 1,
        February = 2,
        March = 3,
        April = 4,
        May = 5,
        June = 6,
        July = 7,
        August = 8,
        September = 9,
        October = 10,
        November = 11,
        December = 12
    }

    public enum Category
    {

        General = 1,
        OBC = 2,
        SC = 3,
        ST = 4,
        Other = 5
    }

    public enum BloodGroup
    {
        OPositive = 1,
        ONegative = 2,
        APositive = 3,
        ANegative = 4,
        BPositive = 5,
        BNegative = 6,
        ABPositive = 7,
        ABNegative = 8,
    }


    public enum Nationality
    {
        Indian = 1,
        Other = 2
    }

    public enum Religion
    {
        Hinduism = 1,
        Islam = 2,
        Christianity = 3,
        Sikhism = 4,
        Buddhism = 5,
        Jainism = 6,
        Tribal = 7,
        Other = 8
    }

    public enum PupilAdmissionStatus
    {
        Active = 1,
        //Promoted = 2,
        //ClassBack = 3,
        Inactive = 2,
    }

    public enum PupilStatus
    {
        Active = 1,
        Inactive = 2,
        Left = 3
    }
    public enum FeePaymentStatus
    {
        Pending = 1,
        Paid = 2,
        Cancelled = 3
    }
    public enum PaymentMode
    {
        Cash = 1,
        Cheque = 2,
        POS = 3,
        QRCode = 4,
        Online = 6,
        Others = 10
    }
    public enum FeeFor
    {
        AdmissionFee = 1,
        ClassFee = 2,
        RegistrationFee = 3,
        TransportFee = 4,
        Fine = 6,
        OtherCharges = 7
    }
    public enum PaymentFor
    {
        Fee = 1,
        Registration = 2,
        Miscellaneous = 3,
    }
    public enum Gender
    {
        Male = 1,
        Female = 2,
        Other = 3
    }
    public enum StaffType
    {
        SuperAdmin = 1,
        Admin = 2,
        TeachingStaff = 3,
        NonTeachingStaff = 4
    }

    public enum Status
    {
        Active = 1,
        Inactive = 2
    }

    public enum LoginResult
    {
        Error = 1,
        WrongUserName = 2,
        AccountNotActive = 3,
        WrongPassword = 4,
        Successful = 5
    }

    public enum AdmissionType
    {
        NewAdmission = 1,
        Promoted = 2,
        ClassBack = 3
    }
}
