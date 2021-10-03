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

    crtaj(rodDocument, rod){
        if(!rod){
            throw new Error("Roditeljski element neispravan!");
        }
        else{
            this.documen = rodDocument;
            this.kontejner = rod;


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

                    fetch("https://localhost:5001/Dostava/PreuzmiRestorane/").then(r=>{
                    r.json().then(data=> {
                        data.forEach(rest=>{
                            //console.log("Restoran nadjen!");
                            if(selekt.options[selekt.selectedIndex].innerHTML == rest.filter){
                        // console.log(rest.ime);
                            const restoran1 = new Restoran(rest.id, rest.ime);
                            
                                    
                            
                            fetch("https://localhost:5001/Dostava/PreuzmiSveProizvodeJednogRestorana/" + restoran1.id).then(p=>{
                                        p.json().then(data=> {
                                            data.forEach(proi=>{
                                                
                                                    const proizvod1 = new Proizvod(proi.id, proi.ime, proi.cena, proi.sastojci);
                                                    //console.log(proizvod1.toString());
                                                    restoran1.dodajProizvod(proizvod1, this.kontejnerProizvodaKorpeGlobal,  this.documen);
                                                    //console.log(proi.Restoran.id);
                                               // };
                                                
                                            });
                                        });
                                    });
                            
                            
                            
                            // fetch("https://localhost:5001/Dostava/PreuzmiProizvode").then(p=>{
                            //             p.json().then(data=> {
                            //                 data.forEach(proi=>{
                            //                     if(this.isCorrectID(restoran1.id, proi.id)){
                            //                     //console.log("Restoran nadjen!");
                            //                     //if(restoran1.id == proi.Restoranid){
                            //                     // console.log(rest.ime);
                            //                         const proizvod1 = new Proizvod(proi.id, proi.ime, proi.cena, proi.sastojci);
                            //                         //console.log(proizvod1.toString());
                            //                         restoran1.dodajProizvod(proizvod1, this.kontejnerProizvodaKorpeGlobal,  this.documen);
                            //                         //console.log(proi.Restoran.id);
                            //                    // };
                            //                     }
                            //                 });
                            //             });
                            //         });

                            // gore je stari nacin nabavljanja, sada se koristi bolji
                

                        restoran1.crtajRestoran(kontejnerSvihRestorana);
                             };
                        });
                    });
                });
            //     //Prikazi sve restorane na osnovu filtera
            }; 
            // Dugme end

            const inputPromeniNaziv = document.createElement("input");
            inputPromeniNaziv.className = "input";
            kontejnerDostave.appendChild(inputPromeniNaziv);

            const dugmePromeni = document.createElement("button");
            dugmePromeni.innerHTML = "Promeni naziv";
            dugmePromeni.className = "dugmePromeni";
            kontejnerDostave.appendChild(dugmePromeni);
            dugmePromeni.onclick = (ev) =>{
                const novoImeDostave = inputPromeniNaziv.value;
                kontejnerDostave.querySelector(".imeDostave").innerHTML = novoImeDostave;
                try{
                    fetch("https://localhost:5001/Dostava/IzmeniDostavu/",
                    {
                        method: "PUT",
                        headers:
                        {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify
                        ({
                            ID: this.id,
                            Ime: novoImeDostave
                        })
                    }).then(resp =>{
                        if(resp.ok){
                        kontejnerDostave.querySelector(".imeDostave").innerHTML = novoImeDostave;
                        this.ime = novoImeDostave;
                        alert("Ime dostave promenjeno!");
                        }
                    });
                }
                catch(err){
                    alert(err);
                }
            }

            const dugmeIzbrisi = document.createElement("button");
            dugmeIzbrisi.innerHTML = "Izbrisi dostavu";
            dugmeIzbrisi.className = "dugmeIzbrisi";
            kontejnerDostave.appendChild(dugmeIzbrisi);
            dugmeIzbrisi.onclick = (ev) =>{
                try{
                    fetch("https://localhost:5001/Dostava/IzbrisiDostavu/" + this.id,{
                        method: "DELETE",
                        headers: 
                        {
                            "Content-type": "application/json"
                        }
                    }).then(resp =>{
                        if(resp.ok){
                            alert("Dostava uspesno izbrisana!");
                            this.kontejner.removeChild(kontejnerCeleDostave);
                        }
                    })
                }
                catch(err){
                    alert(err);
                }
            }



           
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

    crtajNovaDostavaFormu(){
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
            dugmeNovaDostava.className = "dugme";
            kontejnerNovaDostava.appendChild(dugmeNovaDostava);
            dugmeNovaDostava.onclick = (ev) =>{
                const imeNoveDostave = imeDostave.value;
                try{
                    fetch("https://localhost:5001/Dostava/UpisiDostavu/",{
                        method: "POST",
                        headers:{ 
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            Ime: imeNoveDostave
                        })                        
                    }).then(resp =>{
                        if(resp.ok){
                            alert("Nova dostava napravljena!");
                            const dos1 = new Dostava(2, imeNoveDostave);
                            dos1.crtaj(this.documen, this.kontejner);
                        }
                    })
                }
                catch(err){
                    alert(err);
                }
            }
    }

    crtajCeoKontejner(rod){
        if(!rod){
            throw new Error("Roditeljski element neispravan!");
        }
        else{
            this.documen = rod;

            this.kontejner = document.createElement("div");
            this.kontejner.className = "kontejner";
            rod.appendChild(this.kontejner);
            this.crtajNovaDostavaFormu();
            return true;

            
        }
    }
}