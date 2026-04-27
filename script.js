// 🧠 ESTADO GLOBAL
let carrito = []
let total = 0
let sugerenciaMostrada = false

// 💎 FORMATO MONEDA
function formatPrice(num){
    return Number(num).toLocaleString("es-MX")
}

// 🎁 CERTIFICADOS
function seleccionarValor(valor){
    document.getElementById("valorCertificado").value = valor
}

function agregarCertificado(){
    let valor = document.getElementById("valorCertificado").value
    if(valor === ""){
        alert("Ingrese un monto")
        return
    }

    agregar("Certificado $" + valor, parseFloat(valor))
    document.getElementById("valorCertificado").value = ""
}

// 🧾 SERVICIOS COMPLETOS
const servicios = {

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en tradiciones Aztecas y la luna llena."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Tecnología prebiótica y técnicas Kobido japones."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Experiencia en cabina de parejas."},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda."},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Alivio muscular."},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Revitalización."},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Tensión deportiva."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Incluye piedras calientes."},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Relajación profunda."},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Para embarazadas."}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Adaptado a tu piel."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Reduce signos de edad."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Piel luminosa."},
{nombre:"Hydrafacial",precio60:4500,desc:"Resultados instantáneos."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Limpieza profunda."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Tratamiento rápido."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Renovación profunda."},
{nombre:"Tratamiento equilibrante 60 min",precio:2600,desc:"Balance cuerpo mente."},
{nombre:"Tratamiento nutritivo 60 min",precio:2600,desc:"Piel luminosa."},
{nombre:"Power hour 60 min",precio:2400,desc:"Activación intensa."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300},
{nombre:"Piedras calientes",precio:300},
{nombre:"Mascarilla plástica",precio:400},
{nombre:"Aromaterapia",precio:300},
{nombre:"Mascarilla 111skin",precio:500},
{nombre:"Exfoliación",precio:450},
{nombre:"Balsamo cuello",precio:300},
{nombre:"Parches ojos",precio:400},
{nombre:"Limpieza facial express",precio:300},
{nombre:"Rodillo jade",precio:300},
{nombre:"Balsamo muscular",precio:450},
{nombre:"Acondicionador capilar",precio:300},
{nombre:"Balsamo reafirmante",precio:450}
]

}

// 🧴 MOSTRAR SERVICIOS
function mostrar(cat){

let htmlArray = []

servicios[cat].forEach(s=>{

if(s.precio60 && s.precio90){

htmlArray.push(`
<div class="card">
<h3>${s.nombre}</h3>

<button onclick="agregar('${s.nombre} 60 min',${s.precio60})">
60 min $${formatPrice(s.precio60)}
</button>

<button onclick="agregar('${s.nombre} 90 min',${s.precio90})">
90 min $${formatPrice(s.precio90)}
</button>

<button onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)

}else if(s.precio25 && s.precio40){

htmlArray.push(`
<div class="card">
<h3>${s.nombre}</h3>

<button onclick="agregar('${s.nombre} 25 min',${s.precio25})">
25 min $${formatPrice(s.precio25)}
</button>

<button onclick="agregar('${s.nombre} 40 min',${s.precio40})">
40 min $${formatPrice(s.precio40)}
</button>

<button onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)

}else{

htmlArray.push(`
<div class="card">
<h3>${s.nombre}</h3>

<button onclick="agregar('${s.nombre}',${s.precio})">
$${formatPrice(s.precio)}
</button>

<button onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)
}

})

document.getElementById("servicios").innerHTML = htmlArray.join("")
}

// 💎 RECOMENDACIONES INTELIGENTES
function recomendarMejoras(nombre){

if(sugerenciaMostrada) return

let texto = nombre.toLowerCase()

if(!texto.includes("masaje") && !texto.includes("facial")) return

let opciones = ""

if(texto.includes("facial")){

opciones = `
<button onclick="agregar('Mascarilla 111skin',500); cerrarMejoras()">Mascarilla $500</button>
<button onclick="agregar('Rodillo jade',300); cerrarMejoras()">Rodillo jade $300</button>
<button onclick="agregar('Mascarilla plástica',400); cerrarMejoras()">Mascarilla $400</button>
`

}else{

opciones = `
<button onclick="agregar('Aromaterapia',300); cerrarMejoras()">Aromaterapia $300</button>
<button onclick="agregar('Piedras calientes',300); cerrarMejoras()">Piedras $300</button>
<button onclick="agregar('Cepillado corporal',300); cerrarMejoras()">Cepillado $300</button>
`
}

document.getElementById("opcionesMejoras").innerHTML = opciones
document.getElementById("modalMejoras").style.display = "flex"
sugerenciaMostrada = true
}

function cerrarMejoras(){
document.getElementById("modalMejoras").style.display = "none"
sugerenciaMostrada = false
}

// 🛒 AGREGAR
function agregar(nombre,precio){

carrito.push({nombre,precio})
actualizar()

console.log("✔️ agregado:", nombre)

// scroll UX
document.querySelector(".carrito").scrollIntoView({
behavior:"smooth"
})

recomendarMejoras(nombre)
}

// ❌ ELIMINAR
function eliminar(i){
carrito.splice(i,1)
actualizar()
}

// 🔄 ACTUALIZAR CARRITO
function actualizar(){

let lista = document.getElementById("lista")
lista.innerHTML = ""
total = 0

carrito.forEach((item,i)=>{

total += item.precio

lista.innerHTML += `
<div class="item-carrito">
<span>${item.nombre}</span>
<span>$${formatPrice(item.precio)}</span>
<button onclick="eliminar(${i})">X</button>
</div>
`
})

document.getElementById("total").innerText = "Total: $" + formatPrice(total)
}

// 💰 PROPINA
function togglePropina(mostrar){
document.getElementById("montoPropina").style.display = mostrar ? "block" : "none"
}

// 🌑 MODAL
function detalle(t, d, img = null){

    document.getElementById("titulo").innerText = t

    // 🧠 Detecta si es imagen o texto
    if(img){
        document.getElementById("modalImage").style.backgroundImage = `url(${img})`
        document.getElementById("modalImage").style.display = "block"
        document.getElementById("descripcion").innerText = d
    }else{
        document.getElementById("modalImage").style.display = "none"
        document.getElementById("descripcion").innerText = d
    }

    document.getElementById("modal").style.display = "flex"
}

function cerrar(){
document.getElementById("modal").style.display = "none"
}

// 📲 WHATSAPP
function enviar(){

let nombre = document.getElementById("nombre").value
let destinatario = document.getElementById("destinatario").value
let telefono = document.getElementById("telefono").value
let correo = document.getElementById("correo").value

if(!nombre || !telefono){
alert("Completa nombre y teléfono")
return
}

let mensaje = "Solicitud Spa%0A%0A"

carrito.forEach(s=>{
mensaje += `${s.nombre} $${formatPrice(s.precio)}%0A`
})

mensaje += `%0ATotal: $${formatPrice(total)}%0A`
mensaje += `Cliente: ${nombre}%0A`
mensaje += `Destinatario: ${destinatario}%0A`
mensaje += `Tel: ${telefono}%0A`
mensaje += `Correo: ${correo}%0A`

// PROPINA
let propinaSeleccion = document.querySelector('input[name="propina"]:checked')

if(propinaSeleccion){
if(propinaSeleccion.value==="si"){
let monto = document.getElementById("propinaMonto").value || 0
mensaje += `Propina: Sí $${monto}%0A`
}else{
mensaje += "Propina: No%0A"
}
}

let numero = "5215580952588"

window.open(`https://wa.me/${numero}?text=${mensaje}`)
}
