using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ReferralForm
    {
        public int Id { get; set; }
        public string CandName { get; set; }
        public string JobId { get; set; }
        public string CandPhone { get; set; }
        public string CandEmail { get; set; }
        public string EmpID { get; set; }
        public string EmpName { get; set; }
        public string Comments { get; set; }
        public string Status { get; set; }
    }
}
