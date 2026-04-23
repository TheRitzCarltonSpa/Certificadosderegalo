let cart = [];
let selectedService = {};
let sugerenciaMostrada = false;

/* ================================
   CONFIGURACIÓN DE CATEGORÍAS (EDITABLE)
================================ */
const categoriasUI = [
    { nombre: "Bienestar", key: "bienestar", img: "images/bienestar.jpg" },
    { nombre: "Masajes", key: "masajes", img: "images/masajes.jpg" },
    { nombre: "Faciales", key: "faciales", img: "images/faciales.jpg" },
    { nombre: "Corporales", key: "corporales", img: "images/corporales.jpg" },
    { nombre: "Mejoras", key: "mejoras", img: "images/mejoras.jpg" }
];

/* ================================
   CATÁLOGO DE SERVICIOS
================================ */
const servicios = {
    bienestar:[
        {nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Restauración integral cuerpo-mente."},
        {nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Limpieza energética con tradición Azteca."}
    ],
    masajes:[
        {nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda."},
        {nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Alivia tensión muscular."}
    ],
    faciales:[
        {nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Purifica e hidrata."}
    ],
    corporales:[
        {nombre:"Power hour 60 min",precio:2400,desc:"Energía total."}
    ],
    mejoras:[
        {nombre:"Aromaterapia",precio:300,desc:"Aceites esenciales."}
    ]
};

/* ================================
   INTRO
================================ */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 2000);

    initCategorias();
};

/* ================================
   CREAR CATEGORÍAS
================================ */
function initCategorias() {
    const container = document.getElementById("categorias");

    categoriasUI.forEach(cat => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${cat.img}">
            <h3 style="text-align:center">${cat.nombre}</h3>
        `;

        card.onclick = () => {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            showServices(cat.key, cat.img);
        };

        container.appendChild(card);
    });
}

/* ================================
   MOSTRAR SERVICIOS
================================ */
function showServices(cat, img) {
    const container = document.getElementById("servicios");
    const lista = servicios[cat];

    container.innerHTML = `<h2 style="grid-column: span 2;">${cat.toUpperCase()}</h2>`;

    lista.forEach(s => {

        let div = document.createElement("div");
        div.className = "servicio-item";

        let botones = "";

        if (s.precio60 && s.precio90) {
            botones += `
            <button class="btn luxury"
            onclick="openModal('${s.nombre} 60 min',${s.precio60},'${img}',\`${s.desc}\`)">
            60 min $${s.precio60}</button>

            <button class="btn luxury"
            onclick="openModal('${s.nombre} 90 min',${s.precio90},'${img}',\`${s.desc}\`)">
            90 min $${s.precio90}</button>
            `;
        } else {
            botones += `
            <button class="btn luxury"
            onclick="openModal('${s.nombre}',${s.precio},'${img}',\`${s.desc}\`)">
            $${s.precio}</button>
            `;
        }

        div.innerHTML = `
            <h3>${s.nombre}</h3>
            ${botones}
        `;

        container.appendChild(div);
    });
}

/* ================================
   MODAL
================================ */
function openModal(name, price, img, desc) {
    selectedService = { name, price };

    document.getElementById("modalTitle").textContent = name;
    document.getElementById("modalDesc").textContent = desc || "Experiencia premium";
    document.getElementById("modalPrice").textContent = "$" + price;
    document.getElementById("modalImg").src = img || "images/default.jpg";

    document.getElementById("modalServicio").style.display = "flex";
}

function closeModal() {
    document.getElementById("modalServicio").style.display = "none";
}

/* ================================
   BOTÓN DETALLES DEL ESPECIAL (FIX)
================================ */
function showEspecial() {
    openModal(
        "Especial del Mes",
        5100,
        "imagenes/especial mayo.png",
        "Experiencia exclusiva de relajación total."
    );
}

/* ================================
   AGREGAR DESDE MODAL
================================ */
function addFromModal() {
    addToCart(selectedService.name, selectedService.price);
    closeModal();
    recomendarMejoras(selectedService.name);
}

/* ================================
   CARRITO
================================ */
function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
}

function updateCart() {
    let total = 0;
    let list = document.getElementById("cart");
    list.innerHTML = "";

    cart.forEach(item => {
        total += item.price;
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

/* ================================
   RECOMENDACIONES
================================ */
function recomendarMejoras(nombre){

if(sugerenciaMostrada) return;
sugerenciaMostrada = true;

let texto = nombre.toLowerCase();

if(texto.includes("facial")){
alert("Recomendación:\nMascarilla premium\nRodillo jade\nMascarilla plástica");
}else{
alert("Recomendación:\nAromaterapia\nPiedras calientes\nCepillado corporal");
}

setTimeout(()=>sugerenciaMostrada=false,2000);
}

/* ================================
   CERTIFICADO
================================ */
function setCert(amount) {
    document.getElementById("certificadoCantidad").value = amount;
}

/* ================================
   PROPINA
================================ */
function toggleTip() {
    document.getElementById("tipAmount").style.display =
        document.getElementById("tipOption").value === "si" ? "block" : "none";
}

/* ================================
   WHATSAPP
================================ */
function sendWhatsApp() {
    let nombre = document.getElementById("nombre").value;
    let destinatario = document.getElementById("destinatario").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let total = document.getElementById("total").textContent;
    let tip = document.getElementById("tipAmount").value || 0;

    let serviciosSeleccionados = cart.map(i => i.name).join(", ");

    let mensaje = `
Nombre: ${nombre}
Destinatario: ${destinatario}
Correo: ${correo}
Teléfono: ${telefono}
Servicios: ${serviciosSeleccionados}
Total: $${total}
Propina: ${tip}
`;

    window.open(`https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`);
}
