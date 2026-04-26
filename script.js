let cart = [];
let total = 0;

// SPLASH
window.addEventListener("load", () => {
    setTimeout(()=>{
        document.getElementById("splash").classList.add("fade-out");

        setTimeout(()=>{
            document.getElementById("splash").style.display="none";
            document.getElementById("app").classList.add("show");
        },1000);

    },1500);
});

// CATEGORÍAS
const data = [
    {nombre:"Bienestar", img:"bienestar.jpg"},
    {nombre:"Masajes", img:"masajes.jpg"},
    {nombre:"Faciales", img:"faciales.jpg"},
    {nombre:"Corporales", img:"corporales.jpg"},
    {nombre:"Mejoras", img:"mejoras.jpg"}
];

const cont = document.getElementById("categorias");

data.forEach(cat=>{
    let div = document.createElement("div");
    div.className="categoria";

    div.innerHTML = `
        <div class="categoria-header" style="background-image:url('${cat.img}')">
            <h3>${cat.nombre}</h3>
        </div>
        <div class="tratamientos">
            ${genTratamientos(cat.nombre)}
        </div>
    `;

    div.querySelector(".categoria-header").onclick = ()=>{
        div.classList.toggle("active");
    };

    cont.appendChild(div);
});

function genTratamientos(cat){
    let html="";
    for(let i=1;i<=10;i++){
        html+=`
        <div class="tratamiento">
            <span>${cat} ${i}</span>
            <div>
                <button onclick="openUpgrade('${cat}','${cat} ${i}',500)">Agregar</button>
                <button onclick="openDetail('${cat} ${i}')">Detalle</button>
            </div>
        </div>`;
    }
    return html;
}

// CARRITO
function addToCart(name,price){
    cart.push({name,price});
    total+=price;
    renderCart();
}

function renderCart(){
    let div=document.getElementById("cart");
    div.innerHTML="";

    cart.forEach((item,i)=>{
        div.innerHTML+=`
        <p>${item.name} - $${item.price}
        <button onclick="removeItem(${i})">X</button></p>`;
    });

    document.getElementById("total").innerText="Total: $"+total;
}

function removeItem(i){
    total-=cart[i].price;
    cart.splice(i,1);
    renderCart();
}

// CERTIFICADO
function addCertificate(){
    let val=document.getElementById("certValue").value;
    let qty=document.getElementById("certQty").value||1;
    addToCart("Certificado $" + val, val*qty);
}

// MODAL
function openDetail(text){
    document.getElementById("modal").style.display="block";
    document.getElementById("modalText").innerText=text;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

// MEJORAS
function openUpgrade(cat,name,price){
    let mejoras={
        "Masajes":["Aromaterapia","Piedras calientes","Aceites premium"],
        "Faciales":["Colágeno","Oro","Vitamina C"],
        "Corporales":["Exfoliación","Hidratación","Envoltura"]
    };

    let list=mejoras[cat]||["Básico","Medio","Premium"];

    let div=document.getElementById("upgradeOptions");
    div.innerHTML="";

    list.forEach(op=>{
        div.innerHTML+=`
        <button onclick="selectUpgrade('${name}','${op}',${price})">${op}</button>`;
    });

    document.getElementById("upgradeModal").style.display="block";
}

function selectUpgrade(name,op,price){
    addToCart(name+" + "+op,price+200);
    closeUpgrade();
}

function closeUpgrade(){
    document.getElementById("upgradeModal").style.display="none";
}

// PROPINA
function toggleTip(){
    let val=document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display=val==="Si"?"block":"none";
}

// WHATSAPP
function sendWhatsApp(){
    let tel=document.getElementById("telefono").value;
    let tip=document.getElementById("tipAmount").value||0;

    let msg="Pedido Spa:\n";

    cart.forEach(i=>{
        msg+=`${i.name} - $${i.price}\n`;
    });

    msg+=`Total: $${total}\nPropina: $${tip}`;

    window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`);
}
