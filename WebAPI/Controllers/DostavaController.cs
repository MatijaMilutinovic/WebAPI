using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Windows.Forms;
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
        public async Task IzmeniDostavu(Dostava dos){
            //var updostava = Context.Dostave.Where(d => d.Ime == dos.Ime).First();
            // if(updostava != null){
            // //(Context.Dostave.Where(d => d.Ime == imeDostave).Any()){
            // //   MessageBox.Show("asdf"); 

            // }
            // else{

                Context.Dostave.Update(dos);
                await Context.SaveChangesAsync();
                // updostava.Ime = imeDostave;
                // var novaDostava = new Dostava{ID = updostava.ID, Ime = imeDostave};
                // //var dos = new Dostava() {Ime = imeDostave};
                // Context.Update<Dostava>(novaDostava);
                // //Context.Entry(updostava).Property("Ime").IsModified = true;
                // await Context.SaveChangesAsync();
            //}
        }

        [Route("IzbrisiDostavu/{id}")]
        [HttpDelete]
        public async Task IzbrisiDostavu(int id){
            // var res = Context.Proizvodi.Where(s=>s.Restoran.ID == id);
            // await res.ForEachAsync(s=>{
            //     Context.Remove(s);
            // });

            // var proi = Context.Restorani.Where(s=>s.Dostava.ID == id);
            // await proi.ForEachAsync(s=>{
            //     Context.Remove(s);
            // });

            var dos = await Context.Dostave.FindAsync(id);
            Context.Remove(dos);
            await Context.SaveChangesAsync();
            }


        [Route("PreuzmiRestoraneJedneDostave/{id}")]
        [HttpGet]
        public async Task<List<Restoran>> PreuzmiRestoraneJedneDostave(int id){
            
            //var rest = await Context.Restorani.ToListAsync();
            // foreach(Restoran item in rest)
            // {
            //     Console.WriteLine(item.Dostava.Ime);
            // };
            return await Context.Restorani.Where(x => x.Dostava.ID == id).ToListAsync();
        }


        [Route("PreuzmiRestorane")]
        [HttpGet]
        public async Task<List<Restoran>> PreuzmiRestorane(){
            
            //var rest = await Context.Restorani.ToListAsync();
            // foreach(Restoran item in rest)
            // {
            //     Console.WriteLine(item.Dostava.Ime);
            // };
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

        [Route("PreuzmiSveProizvodeJednogRestorana/{id}")]
        [HttpGet]
        public async Task<List<Proizvod>> PreuzmiSveProizvodeJednogRestorana(int id){
            return await Context.Proizvodi.Where(x => x.Restoran.ID == id).ToListAsync();
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