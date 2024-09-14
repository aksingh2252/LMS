export interface KeyValueModel {
    Key: number,
    Value: string
}


export interface FeePaymentModel {
    PupilAdmissionId: number;
    PaymentDate: Date;
    PaymentMode: number;
    ChequeNo: string | null;
    ChequeDate: Date | null;
    ChequeBank: string;
    ChequeBankBranch: string;
    TransactionNo: string;
    FeeAmount: number;
    WaiveOffAmount: number;
    TotalAmount: number;
    PaidAmount: number;
    Remarks: string;
    RemarksOnWaiveOff: string;
}

export interface FeePaymentDetailModel {
    FeePaymentDetailId: number;
    IsSelected: boolean;
    IsCompulsory: boolean;
    HeadId: number;
    HeadName: string;
    FeeFor: number;
    FeeAmount: number;
    WaiveOffAmount: number;
    TotalAmount: number;
    Remarks: string;
    PupilWaiveOffId: number | null;
    PupilWaiveOffList: PupilWaiveOffModel[];
}

export interface FeePaymentMonthModel {
    IsSelected: boolean;
    IsExpand: boolean;
    FeePaymentMonthId: number;
    Year: number;
    MonthId: number;
    Date: string;
    Position: number;
    MonthName: string;
    TotalAmount: number;
    FeePaymentDetailList: FeePaymentDetailModel[];
}

export interface PupilWaiveOffModel {
    PupilWaiveOffId: number;
}

export interface FilterModel {
    FromDate: string | null;
    ToDate: string | null;
    Id: number;
    ClassId: number;
    PupilId: number;
    SearchPupil: string;
    SectionId: number;
    SessionId: number;
    FeePaymentStatus: number;
    MonthId: number;
}

export interface ActionModel {
    CanEdit: boolean,
    CanCreate: boolean,
    CanDelete: boolean,
    ResponseReceived:boolean,
}
export interface StaffLoginModel{
    StaffLoginId:number,
    StaffId:number,
    StaffName:string,
    UserName:string,
    DesignationName:string
}
export interface rack{
    RackId:number,
    RackNo:number,
    UpdatedBy:number,
    UpdatedDate:string,
    Status:string
}


export interface BookType{
    BookTypeId:number,
    BookTypeName:string
    Status:string,
    UpdatedBy:number,
    UpdatedDate:string,

}
export interface Book{
    BookId:number,
    BookName:string,
    AuthorName:string,
    Edition:string,
    Publisher:string,
    Publishingyear:number,
    Totalpage:number;
    volume:number,
    UpdatedBy:number,
    UpdatedDate:string,
     
}










