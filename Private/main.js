import { Proizvod } from "./Proizvod.js";
import { Dostava } from "./Dostava.js"
import { Restoran } from "./Restoran.js";


const glavni = new Dostava(0, "Glavni");
//const newDostava = new Dostava(2, "Nova dostava");
if(glavni.crtajCeoKontejner(document.body)){
    fetch("https://localhost:5001/Dostava/PreuzmiDostavu").then(p=>{
        p.json().then(data=> {
            data.forEach(dost=>{
                const dostava1 = new Dostava(dost.id, dost.ime);
                console.log(dostava1.toString());

                dostava1.crtaj(document.body, glavni.kontejner);

            });
        });
    });
   // newDostava.crtaj(document.body, glavni.kontejner);
}

// fetch("https://localhost:5001/Dostava/PreuzmiRestoraneJedneDostave/" + 2).then(p=>{
//         p.json().then(data=> {
//             data.forEach(rest=>{
//                 console.log(rest.id + rest.ime);

//             });
//         });
//     });




//test

// const dugmic = document.createElement("button");
// dugmic.innerHTML = "Pritisni me!";
// document.body.appendChild(dugmic);


