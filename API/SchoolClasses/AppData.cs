using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolClasses
{
    public class AppData
    {
        public static byte[] FileUrlToBytes(string url)
        {
            System.Net.HttpWebRequest request = null;
            System.Net.HttpWebResponse response = null;
            byte[] b = null;

            request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
            response = (System.Net.HttpWebResponse)request.GetResponse();

            if (request.HaveResponse)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    Stream receiveStream = response.GetResponseStream();
                    using (MemoryStream ms = new MemoryStream())
                    {
                        receiveStream.CopyTo(ms);
                        b = ms.ToArray();
                    }
                }
            }
            return b;
        }
        public static byte[] StreamToBytes(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        public static byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }
        public static DateTime CheckDate(string date, string errMsg)
        {
            DateTime parsed;
            if (!DateTime.TryParseExact(date, "dd'/'MM'/'yyyy", CultureInfo.CurrentCulture, DateTimeStyles.None, out parsed))
                throw new ArgumentException(errMsg);
            return parsed;
        }
        public static int CurrentSessionId(SchoolDataContext dataContext,int? StaffLoginId)
        {
            int sessionId = 0;
            var sessions = dataContext.Sessions.Where(x => x.SessionStartDate.Date <= DateTime.Now.Date && x.SessionEndDate.Date >= DateTime.Now.Date);
            if (sessions.Any())
                sessionId = sessions.OrderByDescending(x => x.SessionEndDate).First().SessionId;
            else
            {
                Session session = new Session
                {
                    SessionStartDate = CheckDate("01/04/" + DateTime.Now.Year, ""),
                    SessionEndDate = CheckDate("31/03/" + (DateTime.Now.Year + 1), ""),
                    Status = (byte)Status.Active,
                    UpdatedDate = DateTime.Now,
                    UpdatedBy = StaffLoginId
                };
                session.SessionName = session.SessionStartDate.ToString("yyyy") + "-" + session.SessionEndDate.ToString("yy");
                dataContext.Sessions.InsertOnSubmit(session);
                dataContext.SubmitChanges();
                sessionId = session.SessionId;
            }
            return sessionId;
        }
        public static string GenerateStaffCode(SchoolDataContext dataContext)
        {
            int SlNo = 0;
            var data = dataContext.Staffs.OrderByDescending(x => x.StaffId);
            if (data.Any())
                SlNo = Convert.ToInt32(data.First().StaffCode.Substring(4));
            SlNo += 1;
            return "STF" + SlNo.ToString("D10");
        }

        public static string GenerateReceiptNo(SchoolDataContext dataContext)
        {
            int SlNo = 0;
            var data = dataContext.FeePayments.OrderByDescending(x => x.FeePaymentId);
            if (data.Any())
                SlNo = Convert.ToInt32(data.First().ReceiptNo);
            SlNo += 1;
            return SlNo.ToString();
        }

        public static string GenerateRegistrationNo(SchoolDataContext dataContext)
        {
            int SlNo = 0;
            var data = dataContext.Registrations.OrderByDescending(x => x.RegistrationId);
            if (data.Any())
                SlNo = Convert.ToInt32(data.First().RegistrationNo.Substring(2));
            SlNo += 1;
            return "R" + SlNo.ToString("D5");
        }
    }
}
