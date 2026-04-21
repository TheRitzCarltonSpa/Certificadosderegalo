const categorias = ["Bienestar", "Masajes", "Faciales", "Corporales", "Mejoras"];
let cart = [];

function init() {
    const container = document.getElementById("categorias");

    categorias.forEach(cat => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${cat}</h3>
            <img src="images/${cat.toLowerCase()}.jpg" width="100%">
            <div id="${cat}"></div>
        `;

        container.appendChild(div);

        createServices(cat);
    });
}

function createServices(cat) {
    const container = document.getElementById(cat);

    for (let i = 1; i <= 10; i++) {
        let price60 = 500 + i * 10;
        let price90 = 800 + i * 15;

        let div = document.createElement("div");

        div.innerHTML = `
            <p>${cat} Servicio ${i}</p>
            <button onclick="addToCart('${cat} 60min', ${price60})">60min $${price60}</button>
            <button onclick="addToCart('${cat} 90min', ${price90})">90min $${price90}</button>
            <button onclick="showDetail('${cat} ${i}')">Detalle</button>
        `;

        container.appendChild(div);
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    suggestMejoras();
}

function updateCart() {
    let list = document.getElementById("cart");
    let total = 0;
    list.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        list.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").textContent = total;
}

function suggestMejoras() {
    alert("Te recomendamos:\n1. Aromaterapia\n2. Piedras calientes\n3. Exfoliación premium");
}

function showDetail(service) {
    alert("Detalle de " + service);
}

function showEspecial() {
    alert("Imagen especial del mes");
}

function setCert(amount) {
    document.getElementById("certificadoCantidad").value = amount;
}

function toggleTip() {
    const tip = document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display = tip === "si" ? "block" : "none";
}

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

    let url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

init();
