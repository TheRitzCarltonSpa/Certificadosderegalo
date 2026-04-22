let cart = [];
let selectedService = {};
let sugerenciaMostrada = false;

/* ================================
   CATÁLOGO COMPLETO DE SERVICIOS
================================ */
const servicios = {

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en tradiciones Aztecas con salvia y piedras de sal para limpiar cuerpo y mente."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Tratamiento facial completo con tecnología prebiótica y técnicas Kobido japones."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Masaje en cabina de parejas."},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda."},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Alivia tensión muscular."},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Revitalización total."},
{nombre:"Masaje recuperación muscular",precio60:2800,precio90:3700,desc:"Alivio de tensión deportiva."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Incluye piedras calientes y masaje facial."},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Terapéutico profundo."},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Para embarazadas."}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Purifica e hidrata."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Combate envejecimiento."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Piel luminosa inmediata."},
{nombre:"Hydrafacial",precio60:4500,desc:"Resultados instantáneos."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Energía inmediata."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Tratamiento rápido."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Renueva la piel."},
{nombre:"Tratamiento corporal equilibrante 60 min",precio:2600,desc:"Balance total."},
{nombre:"Tratamiento corporal nutritivo 60 min",precio:2600,desc:"Piel luminosa."},
{nombre:"Power hour 60 min",precio:2400,desc:"Energía total."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Renovación celular"},
{nombre:"Piedras calientes",precio:300,desc:"Relajación profunda"},
{nombre:"Mascarilla plástica",precio:400,desc:"Hidratación"},
{nombre:"Aromaterapia",precio:300,desc:"Aceites esenciales"},
{nombre:"Mascarilla 111skin",precio:500,desc:"Hidratación premium"},
{nombre:"Exfoliación manos, pies o espalda",precio:450,desc:"Suavidad total"},
{nombre:"Bálsamo de cuello y escote",precio:300,desc:"Firmeza"},
{nombre:"Parches de ojos",precio:400,desc:"Mejora tono"},
{nombre:"Limpieza facial express",precio:300,desc:"Rostro renovado"},
{nombre:"Tonificación facial con rodillo de jade",precio:300,desc:"Estimula piel"},
{nombre:"Bálsamo de rescate muscular",precio:450,desc:"Recuperación"},
{nombre:"Acondicionador capilar",precio:300,desc:"Cabello sano"},
{nombre:"Bálsamo corporal reafirmante",precio:450,desc:"Hidratación profunda"}
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
   CATEGORÍAS (EDITABLES)
================================ */
const categoriasUI = [
    { nombre: "Bienestar", key: "bienestar", img: "images/bienestar.jpg" },
    { nombre: "Masajes", key: "masajes", img: "images/masajes.jpg" },
    { nombre: "Faciales", key: "faciales", img: "images/faciales.jpg" },
    { nombre: "Corporales", key: "corporales", img: "images/corporales.jpg" },
    { nombre: "Mejoras", key: "mejoras", img: "images/mejoras.jpg" }
];

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
            showServices(cat.key);
        };

        container.appendChild(card);
    });
}

/* ================================
   MOSTRAR SERVICIOS
================================ */
function showServices(cat) {
    const container = document.getElementById("servicios");
    const lista = servicios[cat];

    if (!lista) return;

    container.innerHTML = `<h2 style="grid-column: span 2;">${cat.toUpperCase()}</h2>`;

    lista.forEach(s => {

        let div = document.createElement("div");
        div.className = "servicio-item";

        let botones = "";

        if (s.precio60 && s.precio90) {
            botones += `
            <button class="btn luxury"
            onclick="openModal('${s.nombre} 60 min',${s.precio60},'',\`${s.desc}\`)">
            60 min $${s.precio60}</button>

            <button class="btn luxury"
            onclick="openModal('${s.nombre} 90 min',${s.precio90},'',\`${s.desc}\`)">
            90 min $${s.precio90}</button>
            `;
        }

        else if (s.precio25 && s.precio40) {
            botones += `
            <button class="btn luxury"
            onclick="openModal('${s.nombre} 25 min',${s.precio25},'',\`${s.desc}\`)">
            25 min $${s.precio25}</button>

            <button class="btn luxury"
            onclick="openModal('${s.nombre} 40 min',${s.precio40},'',\`${s.desc}\`)">
            40 min $${s.precio40}</button>
            `;
        }

        else {
            botones += `
            <button class="btn luxury"
            onclick="openModal('${s.nombre}',${s.precio},'',\`${s.desc}\`)">
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
    document.getElementById("modalDesc").textContent = desc || "";
    document.getElementById("modalPrice").textContent = "$" + price;
    document.getElementById("modalImg").src = img || "images/default.jpg";

    document.getElementById("modalServicio").style.display = "flex";
}

function closeModal() {
    document.getElementById("modalServicio").style.display = "none";
}

/* ================================
   AGREGAR DESDE MODAL + MEJORAS
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
   RECOMENDACIONES AUTOMÁTICAS
================================ */
function recomendarMejoras(nombre){

if(sugerenciaMostrada) return;

sugerenciaMostrada = true;

let texto = nombre.toLowerCase();

if(texto.includes("facial")){

alert(`Recomendación:
Mascarilla 111skin $500
Rodillo de jade $300
Mascarilla plástica $400`);

}else{

alert(`Recomendación:
Aromaterapia $300
Piedras calientes $300
Cepillado corporal $300`);

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
