// 🧠 ESTADO GLOBAL
let carrito = []
let total = 0
let sugerenciaMostrada = false

// 🎬 SPLASH CONTROL (UX PREMIUM)
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none"
        document.getElementById("app").classList.remove("hidden")
    }, 2500)
})

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

// 🧾 SERVICIOS
const servicios = {

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en las tradiciones Aztecas e influenciado por el poder y el simbolismo de la luna llena (Metztli). Ritual profundamente curativo y meditativo, se define por la circuralidad fluida de sus movimientos de masaje y la utilización de salvia purificadora y piedras de sal, para limpiar el cuerpo y la mente de pensamientos y sentimientos que ya no nos sirven."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Este tratamiento facial especializado es el enfoque completo para la salud de la piel, ya que utiliza tecnología de vanguardia pre y pro biótica combinada con los mismos beneficios del ejercicio físico para desintoxicar, vigorizar, esculpir y relajar. Poderosas técnicas para desafiar la edad inspiradas en el Kobido japones."}
],

masajes:[
{nombre:"Masaje Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Comparta una maravillosa experiencia de masaje lado a lado de una persona especial en nuestra cabina de parejas."},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Masaje de presion suave para una relajación profunda."},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Masaje de presion profunda para aliviar la tension muscular."},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Masaje tradicional de presión moderada a firme, que deja una sensacion de revitalizacion y relajacion."},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Recargue su cuerpo con este masaje diseñado para aliviar la tensión acumulada en los músculos. Usando movimientos profundos y técnicas de estiramiento concentradas en áreas especificas para ayudar a aliviar las molestias comunes y la tensión relacionada con el deporte."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Masaje cuerpo completo de presión moderada a fuerte, que incluye piedras calientes en zona de espalda, masaje facial y masaje capilar para un balance corporal relajante."},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Masaje terapéutico y rejuvenecedor con presión de moderada a firme que intensifica la relajacion de los músculos cansados y adoloridos."},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Suave masaje totalmente a la medida ideal para las mujeres embarazadas después del primer trimestre."}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Este facial purifica, hidrata, ilumina y suaviza el cutis adaptandose a sus necesidades."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Tratamiento facial que combate al instante los signos del envejecimiento, suaviza las líneas de expresión y reactiva la luminosidad del cutis."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Restaura la vitalidad y revela una piel brillante, lisa y de aspecto juvenil. Ideal para eventos especiales."},
{nombre:"Hydrafacial",precio60:4500,desc:"Es un tratamiento no invasivo y no quirúrgico que ofrece resultados instantáneos."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Limpia profundamente, hidrata y suaviza la piel, dejando el cutis con energía al instante."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Purifique, hidrate, ilumine y alise su cutis con este rápido y eficaz tratamiento facial."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Purifique su cuerpo o renueve profundamente su piel con esta envoltura corporal personalizada."},
{nombre:"Tratamiento equilibrante 60 min",precio:2600,desc:"Restaure la serenidad del cuerpo y la mente con este tratamiento de espalda, cuello y cabeza."},
{nombre:"Tratamiento nutritivo 60 min",precio:2600,desc:"Luzca una piel luminosa y suave con exfoliación y aplicación profunda de aceite nutritivo."},
{nombre:"Power hour 60 min",precio:2400,desc:"Tratamiento estimulante, purificante y calmante que activa el cuerpo completamente."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Mejora el tono e impulsa la renovación celular."},
{nombre:"Piedras calientes",precio:300,desc:"Relaja profundamente los músculos con calor terapéutico."},
{nombre:"Mascarilla plástica",precio:400,desc:"Ayuda a suavizar y nutrir la piel."},
{nombre:"Aromaterapia",precio:300,desc:"Potencie su tratamiento con aceites esenciales."},
{nombre:"Mascarilla 111skin",precio:500,desc:"Hidrata y suaviza profundamente la piel."},
{nombre:"Exfoliación",precio:450,desc:"Exfoliación manos, pies o espalda"},
{nombre:"Balsamo cuello",precio:300,desc:"Revela una piel más suave y renovada."},
{nombre:"Bálsamo de cuello y escote",precio:300,desc:"Aporta firmeza y luminosidad."},
{nombre:"Parches ojos",precio:400,desc:"Mejora el tono y apariencia del contorno."},
{nombre:"Limpieza facial express",precio:300,desc:"Revitaliza el rostro en pocos minutos."},
{nombre:"Tonificación facial con rodillo de jade",precio:300,desc:"Estimula la microcirculación y tonifica."},
{nombre:"Bálsamo de rescate muscular",precio:450,desc:"Recarga y restaura el cuerpo."},
{nombre:"Acondicionador capilar",precio:300,desc:"Fortalece y mejora el cabello."},
{nombre:"Bálsamo corporal reafirmante",precio:450,desc:"Hidrata y reafirma la piel."}
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

<button class="btn-gold" onclick="agregar('${s.nombre} 60 min',${s.precio60})">
60 min $${formatPrice(s.precio60)}
</button>

<button class="btn-gold" onclick="agregar('${s.nombre} 90 min',${s.precio90})">
90 min $${formatPrice(s.precio90)}
</button>

<button class="btn-detalle" onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)

}else if(s.precio25 && s.precio40){

htmlArray.push(`
<div class="card">
<h3>${s.nombre}</h3>

<button class="btn-gold" onclick="agregar('${s.nombre} 25 min',${s.precio25})">
25 min $${formatPrice(s.precio25)}
</button>

<button class="btn-gold" onclick="agregar('${s.nombre} 40 min',${s.precio40})">
40 min $${formatPrice(s.precio40)}
</button>

<button class="btn-detalle" onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)

}else{

htmlArray.push(`
<div class="card">
<h3>${s.nombre}</h3>

<button class="btn-gold" onclick="agregar('${s.nombre}',${s.precio})">
$${formatPrice(s.precio)}
</button>

<button class="btn-detalle" onclick="detalle(\`${s.nombre}\`, \`${s.desc}\`)">
Detalle
</button>

</div>`)
}

})

document.getElementById("servicios").innerHTML = htmlArray.join("")
}

// 💎 RECOMENDACIONES
function recomendarMejoras(nombre){

if(sugerenciaMostrada) return

let texto = nombre.toLowerCase()

if(!texto.includes("masaje") && 
   !texto.includes("facial") && 
   !texto.includes("corporal")) return

let opciones = ""

if(texto.includes("facial")){

opciones = `
<button class="btn-gold" onclick="agregar('Mascarilla 111skin',500); cerrarMejoras()">Mascarilla $500</button>
<button class="btn-gold" onclick="agregar('Rodillo jade',300); cerrarMejoras()">Rodillo jade $300</button>
<button class="btn-gold" onclick="agregar('Mascarilla plástica',400); cerrarMejoras()">Mascarilla $400</button>
`

}else{

opciones = `
<button class="btn-gold" onclick="agregar('Aromaterapia',300); cerrarMejoras()">Aromaterapia $300</button>
<button class="btn-gold" onclick="agregar('Piedras calientes',300); cerrarMejoras()">Piedras $300</button>
<button class="btn-gold" onclick="agregar('Cepillado corporal',300); cerrarMejoras()">Cepillado $300</button>
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

document.querySelector(".carrito").scrollIntoView({
behavior:"smooth",
block:"center"
})

recomendarMejoras(nombre)
}

// ❌ ELIMINAR
function eliminar(i){
carrito.splice(i,1)
actualizar()
}

// 🔄 ACTUALIZAR
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

// 🌑 MODAL DETALLE
function detalle(t, d, img = null){

    document.getElementById("titulo").innerText = t
    document.getElementById("descripcion").innerText = d

    // 🔥 HERO BACKGROUND
    if(img){
        document.getElementById("modalHero").style.backgroundImage = `url(${img})`
    }else{
        document.getElementById("modalHero").style.backgroundImage = "url('imagenes/especial.jpg')"
    }

    document.getElementById("modal").style.display = "flex"
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
