let cart=[]
let total=0
let currentItem=null
let sugerenciaMostrada=false
let mejoraSeleccionada=null
let mejorasActuales=[]

// INTRO
window.onload=()=>{
setTimeout(()=>{
document.getElementById("intro").style.display="none"
document.getElementById("app").classList.remove("hidden")
},2000)

renderCategorias()
}

// CATEGORÍAS
const categorias=[
{nombre:"masajes",img:"imagenes/masajes.jpg"},
{nombre:"faciales",img:"imagenes/faciales.jpg"},
{nombre:"corporales",img:"imagenes/corporales.jpg"}
{nombre:"corporales",img:"imagenes/mejoras.jpg"}
]

function renderCategorias(){
let html=""
categorias.forEach(c=>{
html+=`
<div class="card" onclick="showServices('${c.nombre}')">
<img src="${c.img}">
<h3>${c.nombre}</h3>
</div>`
})
document.getElementById("categorias").innerHTML=html
}

// SERVICIOS
const servicios={
masajes:[
{nombre:"Relajante",precio60:2000,precio90:3000,desc:"Relajación total"}
],
faciales:[
{nombre:"Facial premium",precio60:2500,desc:"Limpieza profunda"}
],
corporales:[
{nombre:"Envoltura",precio:2800,desc:"Hidratación"}
]
}

function showServices(cat){
let html=""
servicios[cat].forEach(s=>{

if(s.precio60 && s.precio90){
html+=`
<div class="servicio-item">
<h3>${s.nombre}</h3>
<button onclick="openModal('${s.nombre} 60',${s.precio60},'',\`${s.desc}\`)">60m</button>
<button onclick="openModal('${s.nombre} 90',${s.precio90},'',\`${s.desc}\`)">90m</button>
</div>`
}else{
html+=`
<div class="servicio-item">
<h3>${s.nombre}</h3>
<button onclick="openModal('${s.nombre}',${s.precio},'',\`${s.desc}\`)">$${s.precio}</button>
</div>`
}

})
document.getElementById("servicios").innerHTML=html
}

// MODAL SERVICIO
function openModal(n,p,img,d){
currentItem={nombre:n,precio:p}
document.getElementById("modalTitle").innerText=n
document.getElementById("modalDesc").innerText=d
document.getElementById("modalPrice").innerText="$"+p
document.getElementById("modalImg").src=img||"imagenes/default.jpg"
document.getElementById("modalServicio").style.display="flex"
}

function closeModal(){
document.getElementById("modalServicio").style.display="none"
}

function addFromModal(){
addToCart(currentItem.nombre,currentItem.precio)
closeModal()
}

// CARRITO
function addToCart(n,p){
cart.push({nombre:n,precio:p})
updateCart()
recomendarMejoras(n)
}

function updateCart(){
let lista=document.getElementById("cart")
lista.innerHTML=""
total=0

cart.forEach((i,index)=>{
total+=i.precio
lista.innerHTML+=`<li>${i.nombre} $${i.precio}
<button onclick="removeItem(${index})">X</button></li>`
})

document.getElementById("total").innerText=total
}

function removeItem(i){
cart.splice(i,1)
updateCart()
}

// CERTIFICADO
function setCert(v){
document.getElementById("certificadoCantidad").value=v
}

function addCertificate(){
let v=document.getElementById("certificadoCantidad").value
if(!v)return
addToCart("Certificado $"+v,parseFloat(v))
}

// MEJORAS
function recomendarMejoras(nombre){

if(sugerenciaMostrada)return

let mejoras = nombre.toLowerCase().includes("facial")
?[
{nombre:"Mascarilla",precio:400},
{nombre:"Jade",precio:300},
{nombre:"111skin",precio:500}
]
:[
{nombre:"Aromaterapia",precio:300},
{nombre:"Piedras",precio:300},
{nombre:"Cepillado",precio:300}
]

mejorasActuales=mejoras

let html=""
mejoras.forEach((m,i)=>{
html+=`<div class="mejora-card" onclick="selectMejora(${i})" id="m${i}">
${m.nombre} $${m.precio}
</div>`
})

document.getElementById("opcionesMejoras").innerHTML=html
document.getElementById("modalMejoras").style.display="flex"

sugerenciaMostrada=true
}

function selectMejora(i){
document.querySelectorAll(".mejora-card").forEach(e=>e.classList.remove("selected"))
document.getElementById("m"+i).classList.add("selected")
mejoraSeleccionada=mejorasActuales[i]
}

function cerrarMejoras(){
if(mejoraSeleccionada){
addToCart(mejoraSeleccionada.nombre,mejoraSeleccionada.precio)
}
document.getElementById("modalMejoras").style.display="none"
mejoraSeleccionada=null
sugerenciaMostrada=false
}

// PROPINA
function toggleTip(){
let v=document.getElementById("tipOption").value
document.getElementById("tipAmount").style.display=v==="si"?"block":"none"
}

// WHATSAPP
function sendWhatsApp(){

let n=document.getElementById("nombre").value
let d=document.getElementById("destinatario").value
let t=document.getElementById("telefono").value
let c=document.getElementById("correo").value

let msg="Spa:%0A"

cart.forEach(s=>msg+=`${s.nombre} $${s.precio}%0A`)

msg+=`Total $${total}%0ACliente ${n}%0ADestinatario ${d}`

window.open(`https://wa.me/5215586952588?text=${msg}`)
}
