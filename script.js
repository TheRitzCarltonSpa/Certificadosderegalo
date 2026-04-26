let carrito = [];
let total = 0;

function agregarCarrito(nombre, precio){
    carrito.push({nombre, precio});
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito(){
    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    carrito.forEach((item, index)=>{
        let li = document.createElement("li");
        li.innerHTML = `${item.nombre} - $${item.precio} 
        <button onclick="eliminar(${index})">X</button>`;
        lista.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function eliminar(index){
    total -= carrito[index].precio;
    carrito.splice(index,1);
    actualizarCarrito();
}

function mostrarTratamientos(tipo){
    let contenedor = document.getElementById("tratamientos");
    contenedor.innerHTML = "";

    for(let i=1;i<=10;i++){
        let div = document.createElement("div");
        div.className="card";
        div.innerHTML = `
        <h3>${tipo} ${i}</h3>
        <button onclick="abrirModal()">Detalle</button>
        <button onclick="agregarCarrito('${tipo} ${i}',500)">Agregar</button>
        `;
        contenedor.appendChild(div);
    }
}

function abrirModal(){
    document.getElementById("modal").style.display="block";
}

function cerrarModal(){
    document.getElementById("modal").style.display="none";
}

function verDetalle(){
    abrirModal();
}

function enviarWhatsApp(){
    let nombre = document.getElementById("nombre").value;
    let destinatario = document.getElementById("destinatario").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let propina = document.getElementById("propina").value;

    let mensaje = `SPA PREMIUM
Nombre: ${nombre}
Destinatario: ${destinatario}
Correo: ${correo}
Tel: ${telefono}

Carrito:
`;

    carrito.forEach(item=>{
        mensaje += `- ${item.nombre} $${item.precio}\n`;
    });

    let totalFinal = total + (total * propina/100);

    mensaje += `Total: $${totalFinal}`;

    let url = `https://wa.me/521XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url);
}
