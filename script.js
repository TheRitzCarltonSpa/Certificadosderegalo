let cart = [];
let total = 0;

// 📂 CONFIGURACIÓN (EDITABLE)
const categoriasData = [
    {
        nombre: "Bienestar",
        imagen: "imagenes/bienestar.jpg"
    },
    {
        nombre: "Masajes",
        imagen: "imagenes/masajes.jpg"
    },
    {
        nombre: "Faciales",
        imagen: "faciales.jpg"
    },
    {
        nombre: "Corporales",
        imagen: "corporales.jpg"
    },
    {
        nombre: "Mejoras",
        imagen: "mejoras.jpg"
    }
];

// GENERAR UI
const container = document.getElementById("categorias");

categoriasData.forEach(cat => {

    let categoria = document.createElement("div");
    categoria.className = "categoria";

    categoria.innerHTML = `
        <div class="categoria-header" style="background-image:url('${cat.imagen}')">
            <h3>${cat.nombre}</h3>
        </div>

        <div class="tratamientos">
            ${generarTratamientos(cat.nombre)}
        </div>
    `;

    // CLICK DESPLEGAR
    categoria.querySelector(".categoria-header").addEventListener("click", () => {
        categoria.classList.toggle("active");
    });

    container.appendChild(categoria);
});

// GENERAR TRATAMIENTOS
function generarTratamientos(cat){
    let html = "";

    for(let i=1;i<=10;i++){
        html += `
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

// 🛒 CARRITO
function addToCart(name, price){
    cart.push({name,price});
    total += price;
    renderCart();
}

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

function removeItem(i){
    total -= cart[i].price;
    cart.splice(i,1);
    renderCart();
}

// 💎 MEJORAS
function openUpgrade(cat,name,price){
    const mejoras = {
        "Masajes":["Aromaterapia","Piedras calientes","Aceites premium"],
        "Faciales":["Colágeno","Oro","Vitamina C"],
        "Corporales":["Exfoliación","Envoltura","Hidratación"]
    };

    let lista = mejoras[cat] || ["Upgrade básico","Upgrade medio","Upgrade premium"];

    let div = document.getElementById("upgradeOptions");
    div.innerHTML="";

    lista.forEach(op=>{
        div.innerHTML += `
        <button onclick="selectUpgrade('${name}','${op}',${price})">${op}</button>`;
    });

    document.getElementById("upgradeModal").style.display="block";
}

function selectUpgrade(name,upgrade,price){
    addToCart(name + " + " + upgrade, price + 200);
    closeUpgrade();
}

function closeUpgrade(){
    document.getElementById("upgradeModal").style.display="none";
}

// 🌑 MODAL DETALLE
function openDetail(text){
    document.getElementById("modal").style.display="block";
    document.getElementById("modalText").innerText=text;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}
