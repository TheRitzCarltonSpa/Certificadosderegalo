let cart = [];
const categorias = ["Bienestar","Masajes","Faciales","Corporales","Mejoras"];

/* INTRO */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 2000);

    init();
};

/* GENERAR CATEGORÍAS */
function init() {
    const container = document.getElementById("categorias");

    categorias.forEach(cat => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="images/${cat.toLowerCase()}.jpg">
            <h3>${cat}</h3>
        `;

        card.onclick = () => {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            showServices(cat);
        };

        container.appendChild(card);
    });
}

/* SERVICIOS */
function showServices(cat) {
    alert(`Servicios de ${cat} cargados (puedes personalizar aquí UI tipo modal lujo)`);
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

/* MODAL ESPECIAL */
function showEspecial() {
    const modal = document.getElementById("modalEspecial");
    modal.style.display = "flex";

    modal.onclick = () => modal.style.display = "none";
}

/* PROPINA */
function toggleTip() {
    const val = document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display = val === "si" ? "block" : "none";
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
