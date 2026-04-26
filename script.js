let cart = [];
let total = 0;

// 🔵 SPLASH
setTimeout(()=>{
    document.getElementById("splash").style.display="none";
},2000);

// 📂 CATEGORÍAS
const categorias = [
    "Bienestar","Masajes","Faciales","Corporales","Mejoras"
];

const tratamientos = 10;

// GENERAR CATEGORÍAS
const cont = document.getElementById("categorias");

categorias.forEach(cat=>{
    let div = document.createElement("div");
    div.className="card";
    div.innerHTML = `
        <h3>${cat}</h3>
        <button onclick="showTreatments('${cat}')">Ver</button>
    `;
    cont.appendChild(div);
});

// MOSTRAR TRATAMIENTOS
function showTreatments(cat){
    let html = "";

    for(let i=1;i<=10;i++){
        html += `
        <div class="card">
            <h4>${cat} ${i}</h4>
            <button onclick="openUpgrade('${cat}', '${cat} ${i}', 500)">Agregar</button>
            <button onclick="openDetail('${cat} ${i}')">Detalle</button>
        </div>`;
    }

    cont.innerHTML = html;
}

// 🛒 AGREGAR
function addToCart(name, price){
    cart.push({name,price});
    total += price;
    renderCart();
}

// 🛒 CERTIFICADO
function addCertificate(){
    let value = document.getElementById("certValue").value;
    let qty = document.getElementById("certQty").value || 1;

    addToCart("Certificado $" + value, value * qty);
}

// 🛒 RENDER
function renderCart(){
    let div = document.getElementById("cart");
    div.innerHTML="";

    cart.forEach((item,i)=>{
        div.innerHTML += `
        <p>${item.name} - $${item.price}
        <button onclick="removeItem(${i})">X</button></p>`;
    });

    document.getElementById("total").innerText="Total: $" + total;
}

// ❌ ELIMINAR
function removeItem(i){
    total -= cart[i].price;
    cart.splice(i,1);
    renderCart();
}

// 🌑 MODAL DETALLE
function openDetail(text){
    document.getElementById("modal").style.display="block";
    document.getElementById("modalText").innerText=text;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

// 💎 MODAL MEJORAS
function openUpgrade(cat, name, price){
    let options = ["Aromaterapia","Piedras calientes","Aceites premium"];

    let div = document.getElementById("upgradeOptions");
    div.innerHTML="";

    options.forEach(op=>{
        div.innerHTML += `<button onclick="selectUpgrade('${name}','${op}',${price})">${op}</button>`;
    });

    document.getElementById("upgradeModal").style.display="block";
}

// SELECCIONAR MEJORA
function selectUpgrade(name, upgrade, price){
    addToCart(name + " + " + upgrade, price + 200);
    closeUpgrade();
}

function closeUpgrade(){
    document.getElementById("upgradeModal").style.display="none";
}

// 💰 PROPINA
function toggleTip(){
    let val = document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display = val === "Si" ? "block":"none";
}

// 📲 WHATSAPP
function sendWhatsApp(){
    let nombre = document.getElementById("nombre").value;
    let tel = document.getElementById("telefono").value;

    let tip = document.getElementById("tipAmount").value || 0;

    let msg = `Pedido Spa:\n`;
    cart.forEach(i=>{
        msg += `${i.name} - $${i.price}\n`;
    });

    msg += `Total: $${total}\nPropina: $${tip}`;

    let url = `https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`;
    window.open(url);
}
