export class Proizvod{
    constructor(id, ime, cena, sastojci){
        this.id = id;
        this.ime = ime;
        this.cena = cena;
        this.sastojci = sastojci;
        this.restoran = null;
       // this.dugme = null;
    }
    crtajProizvod(rod, korp, doc){
        //console.log("Crtaj proizvod!")

        const kontejnerProizvoda = document.createElement("div");
        kontejnerProizvoda.className = "kontejnerProizvoda";
        rod.appendChild(kontejnerProizvoda);

        let labela = document.createElement("label");
        labela.className = "imeProizvoda"
        labela.innerHTML = this.ime;
        kontejnerProizvoda.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Sastojci: " + this.sastojci;
        labela.className = "sastojci";
        kontejnerProizvoda.appendChild(labela);
        
        labela = document.createElement("label");
        labela.className = "cena";
        labela.innerHTML = "Cena: " + this.cena;
        kontejnerProizvoda.appendChild(labela);

        const dugme = document.createElement("button");
        dugme.className = "dugme";
        dugme.innerHTML = "Dodaj u korpu";
        kontejnerProizvoda.appendChild(dugme);
        //dugme.onclick(ev(this.ime, "Cena: " + this.cena, "Sastojci: " + this.sastojci));

        dugme.onclick = (ev) =>{
            const kontejnerProizvodaKorpe = document.createElement("div");
        kontejnerProizvodaKorpe.className = "kontejnerProizvoda";
        korp.appendChild(kontejnerProizvodaKorpe);

        let labela = document.createElement("label");
        labela.className = "imeProizvoda"
        labela.innerHTML = this.ime;
        kontejnerProizvodaKorpe.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Sastojci: " + this.sastojci;
        labela.className = "sastojci";
        kontejnerProizvodaKorpe.appendChild(labela);
        
        labela = document.createElement("label");
        labela.className = "cena";
        labela.innerHTML = "Cena: " + this.cena;
        kontejnerProizvodaKorpe.appendChild(labela);

        const ukupnaCen = doc.querySelector(".ukupnaCena");
        const substr = ukupnaCen.innerHTML.substring(12);
        let intCena = parseInt(substr) + this.cena;
        ukupnaCen.innerHTML = "Ukupna cena: " + intCena;
        }
    }

    toString(){
        return this.id + ". " + this.ime + " " + this.cena;
    }
    
}