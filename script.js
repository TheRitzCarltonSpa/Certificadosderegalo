let cart = [];

/* CONFIGURACIÓN EDITABLE DE IMÁGENES */
const categorias = [
    { nombre: "Bienestar", img: "images/bienestar.jpg" },
    { nombre: "Masajes", img: "images/masajes.jpg" },
    { nombre: "Faciales", img: "images/faciales.jpg" },
    { nombre: "Corporales", img: "images/corporales.jpg" },
    { nombre: "Mejoras", img: "images/mejoras.jpg" }
];

/* INTRO */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 2000);

    init();
};

/* CREAR CATEGORÍAS */
function init() {
    const container = document.getElementById("categorias");

    categorias.forEach(cat => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${cat.img}">
            <h3 style="text-align:center">${cat.nombre}</h3>
        `;

        card.onclick = () => {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            showServices(cat.nombre);
        };

        container.appendChild(card);
    });
}

/* MOSTRAR SERVICIOS */
function showServices(cat) {
    const container = document.getElementById("servicios");
    container.innerHTML = `<h2>${cat}</h2>`;

    for (let i = 1; i <= 10; i++) {
        let price60 = 500 + i * 10;
        let price90 = 800 + i * 15;

        let div = document.createElement("div");
        div.className = "servicio-item";

        div.innerHTML = `
            <p>${cat} Servicio ${i}</p>
            <button class="btn luxury" onclick="addToCart('${cat} 60min',${price60})">60min $${price60}</button>
            <button class="btn luxury" onclick="addToCart('${cat} 90min',${price90})">90min $${price90}</button>
        `;

        container.appendChild(div);
    }
}

/* CARRITO */
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

/* MODAL */
function showEspecial() {
    const modal = document.getElementById("modalEspecial");
    modal.style.display = "flex";
    modal.onclick = () => modal.style.display = "none";
}

/* CERTIFICADO */
function setCert(amount) {
    document.getElementById("certificadoCantidad").value = amount;
}

/* PROPINA */
function toggleTip() {
    document.getElementById("tipAmount").style.display =
        document.getElementById("tipOption").value === "si" ? "block" : "none";
}

/* WHATSAPP */
function sendWhatsApp() {
    let nombre = document.getElementById("nombre").value;
    let destinatario = document.getElementById("destinatario").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let total = document.getElementById("total").textContent;
    let tip = document.getElementById("tipAmount").value || 0;

    let servicios = cart.map(i => i.name).join(", ");

    let mensaje = `
Nombre: ${nombre}
Destinatario: ${destinatario}
Correo: ${correo}
Teléfono: ${telefono}
Servicios: ${servicios}
Total: $${total}
Propina: ${tip}
`;

    window.open(`https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`);
}
