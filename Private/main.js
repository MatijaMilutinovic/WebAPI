import { Proizvod } from "./Proizvod.js";
import { Dostava } from "./Dostava.js"
import { Restoran } from "./Restoran.js";


console.log("Startup!");
fetch("https://localhost:5001/Dostava/PreuzmiDostavu").then(p=>{
    p.json().then(data=> {
        data.forEach(dost=>{
            const dostava1 = new Dostava(dost.id, dost.ime);
            console.log(dost.id + " " + dost.ime);
            console.log(dostava1.toString());

            dostava1.crtaj(document.body);

        });
    });
});




//test

// const dugmic = document.createElement("button");
// dugmic.innerHTML = "Pritisni me!";
// document.body.appendChild(dugmic);


