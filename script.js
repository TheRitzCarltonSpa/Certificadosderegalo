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

/* 🌍 TRADUCCIONES */
const traducciones={
es:{
especial:"Especial del Mes",
agregar:"Agregar",
detalle:"Detalle",
carrito:"Carrito",
datos:"Datos",
propina:"¿Agregar propina?",
pagar:"Solicitar link de pago"
},
en:{
especial:"Monthly Special",
agregar:"Add",
detalle:"Details",
carrito:"Cart",
datos:"Customer Info",
propina:"Add tip?",
pagar:"Request payment link"
}
}

/* 🌍 CAMBIO IDIOMA */
function setLang(lang){
idiomaActual=lang
localStorage.setItem("lang",lang)

document.querySelectorAll("[data-i18n]").forEach(el=>{
let key=el.getAttribute("data-i18n")
el.innerText=traducciones[lang][key]||el.innerText
})

renderCategorias()
}

/* 💾 LOAD */
window.addEventListener("load",()=>{
let saved=localStorage.getItem("lang")||"es"
setLang(saved)

setTimeout(()=>{
document.getElementById("splash").style.display="none"
document.getElementById("app").classList.remove("hidden")
},2500)

renderCategorias()
})

// 🧾 SERVICIOS
const servicios = {

bienestar:[
{
nombre:{
es:"Ceremonia del despertar 90 min",
en:"Awakening Ceremony 90 min"
},
precio:5000,
desc:{
es:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu.",
en:"A ceremony designed to restore vitality, promote overall wellness, and reconnect body, mind, and spirit."
}
},
{
nombre:{
es:"Ritual limpia Metzli 90 min",
en:"Metzli Cleansing Ritual 90 min"
},
precio:5000,
desc:{
es:"Inspirado en las tradiciones Aztecas e influenciado por el poder y el simbolismo de la luna llena (Metztli). Ritual profundamente curativo y meditativo, se define por la circuralidad fluida de sus movimientos de masaje y la utilización de salvia purificadora y piedras de sal, para limpiar el cuerpo y la mente de pensamientos y sentimientos que ya no nos sirven.",
en:"Inspired by Aztec traditions and the power and symbolism of the full moon (Metzli). A deeply healing and meditative ritual defined by flowing circular massage movements and the use of purifying sage and salt stones to cleanse the body and mind of thoughts and emotions that no longer serve you."
}
},
{
nombre:{
es:"Facial resiliencia natural 90 min",
en:"Natural Resilience Facial 90 min"
},
precio:5000,
desc:{
es:"Este tratamiento facial especializado es el enfoque completo para la salud de la piel, ya que utiliza tecnología de vanguardia pre y pro biótica combinada con los mismos beneficios del ejercicio físico para desintoxicar, vigorizar, esculpir y relajar. Poderosas técnicas para desafiar la edad inspiradas en el Kobido japones.",
en:"This specialized facial treatment offers a complete approach to skin health, using advanced pre- and probiotic technology combined with the benefits of physical exercise to detoxify, energize, sculpt, and relax. Powerful age-defying techniques inspired by Japanese Kobido."
}
}
],

masajes:[
{
nombre:{
es:"Tranquilidad para dos",
en:"Tranquility for Two"
},
precio60:5600,
precio90:7400,
desc:{
es:"Comparta una maravillosa experiencia de masaje lado a lado de una persona especial en nuestra cabina de parejas.",
en:"Share a wonderful side-by-side massage experience with someone special in our couples suite."
}
},
{
nombre:{
es:"Masaje relajante",
en:"Relaxing Massage"
},
precio60:2400,
precio90:3300,
desc:{
es:"Masaje de presion suave para una relajación profunda.",
en:"A gentle pressure massage designed for deep relaxation."
}
},
{
nombre:{
es:"Masaje tejido profundo",
en:"Deep Tissue Massage"
},
precio60:2800,
precio90:3700,
desc:{
es:"Masaje de presion profunda para aliviar la tension muscular.",
en:"A deep pressure massage to relieve muscle tension."
}
},
{
nombre:{
es:"Masaje antiestrés",
en:"Anti-Stress Massage"
},
precio60:2600,
precio90:3500,
desc:{
es:"Masaje tradicional de presión moderada a firme, que deja una sensacion de revitalizacion y relajacion.",
en:"A traditional massage with moderate to firm pressure that leaves a revitalizing and relaxing sensation."
}
},
{
nombre:{
es:"Masaje recuperación muscular",
en:"Muscle Recovery Massage"
},
precio60:2800,
precio90:3700,
desc:{
es:"Recargue su cuerpo con este masaje diseñado para aliviar la tensión acumulada en los músculos. Usando movimientos profundos y técnicas de estiramiento concentradas en áreas especificas para ayudar a aliviar las molestias comunes y la tensión relacionada con el deporte.",
en:"Recharge your body with this massage designed to relieve accumulated muscle tension. Using deep movements and targeted stretching techniques to ease common discomfort and sports-related tension."
}
},
{
nombre:{
es:"Masaje para caballero",
en:"Gentleman's Massage"
},
precio60:2900,
precio90:3800,
desc:{
es:"Masaje cuerpo completo de presión moderada a fuerte, que incluye piedras calientes en zona de espalda, masaje facial y masaje capilar para un balance corporal relajante.",
en:"A full-body massage with moderate to strong pressure, including hot stones on the back, facial massage, and scalp massage for a relaxing body balance."
}
},
{
nombre:{
es:"Masaje piedras calientes",
en:"Hot Stone Massage"
},
precio:3600,
desc:{
es:"Masaje terapéutico y rejuvenecedor con presión de moderada a firme que intensifica la relajacion de los músculos cansados y adoloridos.",
en:"A therapeutic and rejuvenating massage with moderate to firm pressure that enhances relaxation of tired and sore muscles."
}
},
{
nombre:{
es:"Masaje prenatal",
en:"Prenatal Massage"
},
precio60:2400,
precio90:3300,
desc:{
es:"Suave masaje totalmente a la medida ideal para las mujeres embarazadas después del primer trimestre.",
en:"A gentle, fully customized massage ideal for pregnant women after the first trimester."
}
}
],

faciales:[
{
nombre:{es:"Facial Personalizado",en:"Custom Facial"},
precio60:2600,
precio90:3500,
desc:{
es:"Este facial purifica, hidrata, ilumina y suaviza el cutis adaptandose a sus necesidades.",
en:"This facial purifies, hydrates, brightens, and softens the skin, adapting to your specific needs."
}
},
{
nombre:{es:"Facial Anti-edad",en:"Anti-Aging Facial"},
precio60:3300,
precio90:4500,
desc:{
es:"Tratamiento facial que combate al instante los signos del envejecimiento, suaviza las líneas de expresión y reactiva la luminosidad del cutis.",
en:"A facial treatment that instantly combats signs of aging, smooths expression lines, and restores skin radiance."
}
},
{
nombre:{es:"Facial Rejuvenecedor 90 min",en:"Rejuvenating Facial 90 min"},
precio:4000,
desc:{
es:"Restaura la vitalidad y revela una piel brillante, lisa y de aspecto juvenil. Ideal para eventos especiales.",
en:"Restores vitality and reveals radiant, smooth, youthful-looking skin. Ideal before special events."
}
},
{
nombre:{es:"Hydrafacial",en:"Hydrafacial"},
precio60:4500,
desc:{
es:"Es un tratamiento no invasivo y no quirúrgico que ofrece resultados instantáneos.",
en:"A non-invasive, non-surgical treatment that delivers instant results."
}
},
{
nombre:{es:"Facial para caballero 60 min",en:"Men’s Facial 60 min"},
precio:2600,
desc:{
es:"Limpia profundamente, hidrata y suaviza la piel, dejando el cutis con energía al instante.",
en:"Deeply cleanses, hydrates, and softens the skin, leaving it instantly refreshed and energized."
}
},
{
nombre:{es:"Facial Revitalizante",en:"Revitalizing Facial"},
precio25:1200,
precio40:1800,
desc:{
es:"Purifique, hidrate, ilumine y alise su cutis con este rápido y eficaz tratamiento facial.",
en:"Purify, hydrate, brighten, and smooth your skin with this quick and effective facial treatment."
}
}
],

corporales:[
{
nombre:{es:"Envoltura corporal ESPA 60 min",en:"ESPA Body Wrap 60 min"},
precio:2800,
desc:{
es:"Purifique su cuerpo o renueve profundamente su piel con esta envoltura corporal personalizada.",
en:"Purify your body or deeply renew your skin with this personalized body wrap."
}
},
{
nombre:{es:"Tratamiento corporal equilibrante 60 min",en:"Balancing Body Treatment 60 min"},
precio:2600,
desc:{
es:"Restaure la serenidad del cuerpo y la mente con este tratamiento de espalda, cuello y cabeza.",
en:"Restore body and mind serenity with this back, neck, and head treatment."
}
},
{
nombre:{es:"Tratamiento corporal nutritivo 60 min",en:"Nourishing Body Treatment 60 min"},
precio:2600,
desc:{
es:"Luzca una piel luminosa y suave con exfoliación y aplicación profunda de aceite nutritivo.",
en:"Achieve radiant and soft skin with exfoliation and deep nourishing oil application."
}
},
{
nombre:{es:"Power hour 60 min",en:"Power Hour 60 min"},
precio:2400,
desc:{
es:"Tratamiento estimulante, purificante y calmante que activa el cuerpo completamente.",
en:"An intensely stimulating, purifying, and calming treatment that fully energizes your body."
}
}
],

mejoras:[
{
nombre:{es:"Cepillado corporal",en:"Body Brushing"},
precio:300,
desc:{
es:"Mejora el tono e impulsa la renovación celular.",
en:"Improves tone and boosts cellular renewal."
}
},
{
nombre:{es:"Piedras calientes",en:"Hot Stones"},
precio:300,
desc:{
es:"Relaja profundamente los músculos con calor terapéutico.",
en:"Deeply relaxes muscles with therapeutic heat."
}
},
{
nombre:{es:"Mascarilla plástica",en:"Plastic Mask"},
precio:400,
desc:{
es:"Ayuda a suavizar y nutrir la piel.",
en:"Helps soften and nourish the skin."
}
},
{
nombre:{es:"Aromaterapia",en:"Aromatherapy"},
precio:300,
desc:{
es:"Potencie su tratamiento con aceites esenciales.",
en:"Enhance your treatment with essential oils."
}
},
{
nombre:{es:"Mascarilla 111skin",en:"111Skin Mask"},
precio:500,
desc:{
es:"Hidrata y suaviza profundamente la piel.",
en:"Deeply hydrates and softens the skin."
}
},
{
nombre:{es:"Exfoliación manos, pies o espalda",en:"Hand, Feet or Back Exfoliation"},
precio:450,
desc:{
es:"Revela una piel más suave y renovada.",
en:"Reveals softer, renewed skin."
}
},
{
nombre:{es:"Bálsamo de cuello y escote",en:"Neck & Décolleté Balm"},
precio:300,
desc:{
es:"Aporta firmeza y luminosidad.",
en:"Provides firmness and radiance."
}
},
{
nombre:{es:"Parches de ojos",en:"Eye Patches"},
precio:400,
desc:{
es:"Mejora el tono y apariencia del contorno.",
en:"Improves tone and appearance of the eye area."
}
},
{
nombre:{es:"Limpieza facial express",en:"Express Facial Cleanse"},
precio:300,
desc:{
es:"Revitaliza el rostro en pocos minutos.",
en:"Revitalizes your face in minutes."
}
},
{
nombre:{es:"Tonificación facial con rodillo de jade",en:"Jade Roller Facial Toning"},
precio:300,
desc:{
es:"Estimula la microcirculación y tonifica.",
en:"Stimulates microcirculation and tones the skin."
}
},
{
nombre:{es:"Bálsamo de rescate muscular",en:"Muscle Recovery Balm"},
precio:450,
desc:{
es:"Recarga y restaura el cuerpo.",
en:"Recharges and restores the body."
}
},
{
nombre:{es:"Acondicionador capilar",en:"Hair & Scalp Conditioner"},
precio:300,
desc:{
es:"Fortalece y mejora el cabello.",
en:"Strengthens and improves hair health."
}
},
{
nombre:{es:"Bálsamo corporal reafirmante",en:"Firming Body Balm"},
precio:450,
desc:{
es:"Hidrata y reafirma la piel.",
en:"Hydrates and firms the skin."
}
}
]

}

// 🧴 MOSTRAR SERVICIOS
function mostrar(cat){

let htmlArray = []

servicios[cat].forEach(s=>{

if(s.precio60 && s.precio90){
if(s.precio60){
html+=`
<div class="card">
<h3>${s.nombre[idiomaActual]}</h3>

<button onclick="agregar('${s.nombre[idiomaActual]} 60',${s.precio60})">
60 min $${s.precio60}
</button>

<button onclick="agregar('${s.nombre[idiomaActual]} 90',${s.precio90})">
90 min $${s.precio90}
</button>

<button onclick="detalle('${s.nombre[idiomaActual]}','${s.desc[idiomaActual]}')">
Detalle
</button>

</div>
`
}else{
html+=`
<div class="card">
<h3>${s.nombre[idiomaActual]}</h3>

<button onclick="agregar('${s.nombre[idiomaActual]}',${s.precio})">
$${s.precio}
</button>

<button onclick="detalle('${s.nombre[idiomaActual]}','${s.desc[idiomaActual]}')">
Detalle
</button>

</div>
`
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

if(img){
document.getElementById("modalImage").style.backgroundImage = `url(${img})`
document.getElementById("modalImage").style.display = "block"
}else{
document.getElementById("modalImage").style.display = "none"
}

document.getElementById("descripcion").innerText = d
document.getElementById("modal").style.display = "flex"
}

function cerrar(){
document.getElementById("modal").style.display = "none"
document.getElementById("modalImage").style.backgroundImage = ""
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

window.addEventListener("load", ()=>{
setTimeout(()=>{
document.getElementById("splash").style.opacity="0"

setTimeout(()=>{
document.getElementById("splash").style.display="none"
document.getElementById("app").classList.remove("hidden")
traducirUI()
},500)

},1500)
})
