using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferralFormController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReferralFormController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ReferralForm
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferralForm>>> GetreferralForms()
        {
            return await _context.referralForms.ToListAsync();
        }

        // GET: api/ReferralForm/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReferralForm>> GetReferralForm(int id)
        {
            var referralForm = await _context.referralForms.FindAsync(id);

            if (referralForm == null)
            {
                return NotFound();
            }

            return referralForm;
        }

        // PUT: api/ReferralForm/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReferralForm(int id, ReferralForm referralForm)
        {
            if (id != referralForm.Id)
            {
                return BadRequest();
            }

            _context.Entry(referralForm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferralFormExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ReferralForm
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReferralForm>> PostReferralForm(ReferralForm referralForm)
        {
            _context.referralForms.Add(referralForm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReferralForm", new { id = referralForm.Id }, referralForm);
        }

        // DELETE: api/ReferralForm/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReferralForm(int id)
        {
            var referralForm = await _context.referralForms.FindAsync(id);
            if (referralForm == null)
            {
                return NotFound();
            }

            _context.referralForms.Remove(referralForm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReferralFormExists(int id)
        {
            return _context.referralForms.Any(e => e.Id == id);
        }
    }
}
