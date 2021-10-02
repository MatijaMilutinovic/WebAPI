using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DostavaController : ControllerBase{
        public DostavaContext Context {get; set;}

        public DostavaController(DostavaContext context){
            Context = context;
        }

        [Route("PreuzmiDostavu")]
        [HttpGet]
        public async Task<List<Dostava>> PreuzmiDostavu(){
            return await Context.Dostave.ToListAsync();
        }

        [Route("UpisiDostavu")]
        [HttpPost]
        public async Task UpisiDostavu([FromBody] Dostava dostava){
            Context.Dostave.Add(dostava);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniDostavu")]
        [HttpPut]
        public async Task IzmeniDostavu([FromBody] Dostava dostava){
            Context.Update<Dostava>(dostava);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiDostavu/{id}")]
        [HttpDelete]
        public async Task IzbrisiDostavu(int id){
            var res = Context.Proizvodi.Where(s=>s.Restoran.ID == id);
            await res.ForEachAsync(s=>{
                Context.Remove(s);
            });

            var proi = Context.Restorani.Where(s=>s.Dostava.ID == id);
            await proi.ForEachAsync(s=>{
                Context.Remove(s);
            });

            var dos = await Context.Dostave.FindAsync(id);
            Context.Remove(dos);
            await Context.SaveChangesAsync();
            }





        [Route("PreuzmiRestorane")]
        [HttpGet]
        public async Task<List<Restoran>> PreuzmiRestane(){
            return await Context.Restorani.ToListAsync();
        }

        [Route("UpisiRestoran")]
        [HttpPost]
        public async Task UpisiRestoran([FromBody] Restoran rest){
            Context.Restorani.Add(rest);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRestorane")]
        [HttpPut]
        public async Task IzmeniRestorane([FromBody] Restoran rest){
            Context.Update<Restoran>(rest);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRestoran/{id}")]
        [HttpDelete]
        public async Task IzbrisiRestoran(int id){
            var proi = Context.Proizvodi.Where(s=>s.Restoran.ID == id);
            await proi.ForEachAsync(s=>{
                Context.Remove(s);
            });

            var rest = await Context.Restorani.FindAsync(id);
            Context.Remove(rest);
            await Context.SaveChangesAsync();
            }

        




        [Route("PreuzmiProizvode")]
        [HttpGet]
        public async Task<List<Proizvod>> PreuzmiProizvode(){
            return await Context.Proizvodi.ToListAsync();
        }

        [Route("UpisiProizvod")]
        [HttpPost]
        public async Task UpisiProizvod([FromBody] Proizvod proizvod){
            Context.Proizvodi.Add(proizvod);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniProizvod")]
        [HttpPut]
        public async Task IzmeniProizvod([FromBody] Proizvod pro){
            Context.Update<Proizvod>(pro);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiProizvod/{id}")]
        [HttpDelete]
        public async Task IzbrisiProizvod(int id){
            var pro = await Context.Proizvodi.FindAsync(id);
            Context.Remove(pro);
            await Context.SaveChangesAsync();
            }
    }
}