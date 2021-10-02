import { Proizvod } from "./Proizvod.js"

export class Restoran {
    constructor(id, ime, filter){
        this.id = id;
        this.ime = ime;
        this.proizvodi = [];
        this.filter = filter;
        this.kontejnerRestorana = null;
    }

    dodajProizvod(p, korp, doc){
        // this.proizvodi.push(p);
        //console.log("Dodat proizvod!");
        p.crtajProizvod(this.kontejnerRestorana, korp, doc);
    }

    crtajRestoran(rod){
        this.kontejnerRestorana = document.createElement("div");
        this.kontejnerRestorana.className = "kontejnerRestorana";
        rod.appendChild(this.kontejnerRestorana);
        

        let labela = document.createElement("label");
        labela.className = "imeRestorana";
        labela.innerHTML = this.ime;
        this.kontejnerRestorana.appendChild(labela);
        

        // this.proizvodi.forEach(pro =>{
        //     console.log("Crtaj proizvod! (foreach)")
        //     pro.crtajProizvod(kontejnerRestorana, ev);
            
        // });
       // console.log("Posle foreacha");
    }

    toString(){
        return this.id + ". " + this.ime + " " + this.filter;
    }
}