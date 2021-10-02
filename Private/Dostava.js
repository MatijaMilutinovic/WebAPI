import {Restoran} from "./Restoran.js"
import {Proizvod} from "./Proizvod.js"

export class Dostava {
    constructor(id, ime){
        this.id = id;  
        this.ime = ime;
        this.filteri = ["Italijanska", "BBQ", "Azijska"];
        this.restorani = [];
        this.kontejner = null;
        this.kontejnerProizvodaKorpeGlobal = null;
        this.documen = null;
    }

    dodajRestoran(r){
        this.restorani.push(r);
    }

    crtaj(rod){
        if(!rod){
            throw new Error("Roditeljski element neispravan!");
        }
        else{
            this.documen = rod;

            this.kontejner = document.createElement("div");
            this.kontejner.className = "kontejner";
            rod.appendChild(this.kontejner);


            const kontejnerCeleDostave = document.createElement("div");
            kontejnerCeleDostave.className = "kontejnerCeleDostave";
            this.kontejner.appendChild(kontejnerCeleDostave);

           // console.log("Crtaj dostavu!");

            const kontejnerDostave = document.createElement("div");
            kontejnerDostave.className = "kontejnerDostave";
            kontejnerCeleDostave.appendChild(kontejnerDostave);

            let labela = document.createElement("label");
            labela.className = "imeDostave";
            labela.innerHTML = this.ime;
            kontejnerDostave.appendChild(labela);

            const selekt = document.createElement("select");
            selekt.className = "selekt";
            kontejnerDostave.appendChild(selekt);
            let opcija;
            this.filteri.forEach(filt => {
                opcija = document.createElement("option");
                opcija.className = "opcija";
                opcija.innerHTML = filt;
                selekt.appendChild(opcija);
            });

            const kontejnerSvihRestorana = document.createElement("div");
            kontejnerSvihRestorana.className = "kontejnerSvihRestorana";
            kontejnerCeleDostave.appendChild(kontejnerSvihRestorana);

            this.crtajKorpu(kontejnerCeleDostave);
            
            const dugmeFilter = document.createElement("button");
            dugmeFilter.innerHTML = "Prikaži restorane";
            dugmeFilter.className = "dugme";
            kontejnerDostave.appendChild(dugmeFilter);
            dugmeFilter.onclick = (ev) => {
                while(kontejnerSvihRestorana.firstChild){   //children.forEach(child => {
                    kontejnerSvihRestorana.removeChild(kontejnerSvihRestorana.lastChild);
                };

                    fetch("https://localhost:5001/Dostava/PreuzmiRestorane").then(r=>{
                    r.json().then(data=> {
                        data.forEach(rest=>{
                            //console.log("Restoran nadjen!");
                            if(selekt.options[selekt.selectedIndex].innerHTML == rest.filter){
                        // console.log(rest.ime);
                            const restoran1 = new Restoran(rest.id, rest.ime);
                            
                                    fetch("https://localhost:5001/Dostava/PreuzmiProizvode").then(p=>{
                                        p.json().then(data=> {
                                            data.forEach(proi=>{
                                                if(this.isCorrectID(restoran1.id, proi.id)){
                                                //console.log("Restoran nadjen!");
                                                //if(restoran1.id == proi.Restoranid){
                                                // console.log(rest.ime);
                                                    const proizvod1 = new Proizvod(proi.id, proi.ime, proi.cena, proi.sastojci);
                                                    //console.log(proizvod1.toString());
                                                    restoran1.dodajProizvod(proizvod1, this.kontejnerProizvodaKorpeGlobal,  this.documen);
                                                    //console.log(proi.Restoran.id);
                                               // };
                                                }
                                            });
                                        });
                                    });
                

                        restoran1.crtajRestoran(kontejnerSvihRestorana);
                             };
                        });
                    });
                });
            //     //Prikazi sve restorane na osnovu filtera
            }; 

            this.crtajNovaDostavaFormu();



           
        }
    }


    crtajKorpu(rod){
        const kontejnerKorpe = document.createElement("div");
        kontejnerKorpe.className = "kontejnerKorpe";
        rod.appendChild(kontejnerKorpe);

        let labela = document.createElement("label");
        labela.innerHTML = "Korpa";
        labela.className = "imeKorpe";
        kontejnerKorpe.appendChild(labela);

        this.kontejnerProizvodaKorpeGlobal = document.createElement("div");
        this.kontejnerProizvodaKorpeGlobal.className = "kontejnerProizvodaKorpe";
        kontejnerKorpe.appendChild(this.kontejnerProizvodaKorpeGlobal);
        console.log("Nacrtana korpa!");

        const labelaCene = document.createElement("label");
        labelaCene.className = "ukupnaCena";
        labelaCene.innerHTML = "Ukupna cena: 0";
        kontejnerKorpe.appendChild(labelaCene);


        const dugmeDostavi = document.createElement("button");
        dugmeDostavi.innerHTML = "Dostavi";
        dugmeDostavi.className = "dugme";
        kontejnerKorpe.appendChild(dugmeDostavi);
        dugmeDostavi.onclick = (ev) =>{
            if(this.kontejnerProizvodaKorpeGlobal.firstChild){
            while(this.kontejnerProizvodaKorpeGlobal.firstChild){   //children.forEach(child => {
            this.kontejnerProizvodaKorpeGlobal.removeChild(this.kontejnerProizvodaKorpeGlobal.lastChild);
            };
            labelaCene.innerHTML = "Ukupna cena: 0";
            alert("Dostava je na putu!");
        }
        else{
            alert("Nemate proizvoda u korpi!");
        }
        };
    }

    dodajUKorpu(naziv, cena, sastojci){
        /*const kont = document.createElement("div");
        kont.className = "kontejner";
        console.log("Trazi korpu!");
        this.kontejnerProizvodaKorpeGlobal.appendChild(kont);
        

        let labela = document.createElement("label");
        labela.innerHTML = naziv;
        kont.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = sastojci;
        kont.appendChild(labela);
        
        labela = document.createElement("label");
        labela.innerHTML = cena;
        kont.appendChild(labela);*/

        //const cen = kontejnerCeleDostave.querySelector(".//ukupnaCena");
        //cen.innerHTML = cen.innerHTML;
        ////ovde dodati da se update-uje ukupna cena ^
    }

    toString(){
        return this.id + ". " + this.ime;
    }


    isCorrectID(restid, proiid){
        return (proiid-proiid%4)/4+(proiid%4==0?0:1) == restid;
    }

    crtajNovaDostavaFormu(rod){
        const kontejnerNovaDostava = document.createElement("div");
            kontejnerNovaDostava.className = "kontejnerNovaDostava";
            this.kontejner.appendChild(kontejnerNovaDostava);

            let labela = document.createElement("label");
            labela.innerHTML = "Napravi novu dostavu";
            labela.className = "novaDostavaNaslov";
            kontejnerNovaDostava.appendChild(labela);

            const imeDostave = document.createElement("input");
            imeDostave.className = "imeNoveDostave";
            kontejnerNovaDostava.appendChild(imeDostave);

            const dugmeNovaDostava = document.createElement("button");
            dugmeNovaDostava.innerHTML = "Napravi";
            kontejnerNovaDostava.appendChild(dugmeNovaDostava);
            dugmeNovaDostava.onclick = (ev) =>{
                const novoIme = imeDostave.value;
                console.log(novoIme);
            }
    }
}