// ================================
// ESTADO GLOBAL
// ================================
let cart = []
let total = 0
let currentItem = null
let sugerenciaMostrada = false

// ================================
// CONFIGURACIÓN CATEGORÍAS (EDITABLE)
// ================================
const categorias = [
    {nombre:"bienestar", img:"images/bienestar.jpg"},
    {nombre:"masajes", img:"images/masajes.jpg"},
    {nombre:"faciales", img:"images/faciales.jpg"},
    {nombre:"corporales", img:"images/corporales.jpg"},
    {nombre:"mejoras", img:"images/mejoras.jpg"}
]

// ================================
// SERVICIOS
// ================================
const servicios = {

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Restauración total cuerpo y mente"},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Ritual azteca de limpieza energética"},
{nombre:"Facial resiliencia natural 90 min",precio:5000,desc:"Tecnología avanzada + Kobido japonés"}
],

masajes:[
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda"},
{nombre:"Tejido profundo",precio60:2800,precio90:3700,desc:"Alivio muscular"},
{nombre:"Antiestrés",precio60:2600,precio90:3500,desc:"Revitalización total"},
{nombre:"Piedras calientes",precio:3600,desc:"Terapia térmica profunda"}
],

faciales:[
{nombre:"Facial personalizado",precio60:2600,precio90:3500,desc:"Adaptado a tu piel"},
{nombre:"Anti-edad",precio60:3300,precio90:4500,desc:"Rejuvenecimiento inmediato"},
{nombre:"Hydrafacial",precio60:4500,desc:"Tecnología avanzada"}
],

corporales:[
{nombre:"Envoltura ESPA",precio:2800,desc:"Purificación corporal"},
{nombre:"Tratamiento nutritivo",precio:2600,desc:"Hidratación profunda"}
],

mejoras:[
{nombre:"Aromaterapia",precio:300,desc:"Relajación sensorial"},
{nombre:"Piedras calientes",precio:300,desc:"Calor terapéutico"},
{nombre:"Mascarilla 111skin",precio:500,desc:"Alta hidratación"}
]

}

// ================================
// INIT
// ================================
window.onload = () => {

    // Intro
    setTimeout(()=>{
        document.getElementById("intro").style.display="none"
        document.getElementById("app").classList.remove("hidden")
    },2000)

    renderCategorias()
}

// ================================
// CATEGORÍAS
// ================================
function renderCategorias(){

    let html = ""

    categorias.forEach(cat=>{
        html += `
        <div class="card" onclick="showServices('${cat.nombre}')">
            <img src="${cat.img}">
            <h3>${cat.nombre.toUpperCase()}</h3>
        </div>`
    })

    document.getElementById("categorias").innerHTML = html
}

// ================================
// SERVICIOS
// ================================
function showServices(cat){

    let html = ""

    servicios[cat].forEach(s=>{

        // 60 y 90
        if(s.precio60 && s.precio90){

            html += `
            <div class="servicio-item">
                <h3>${s.nombre}</h3>

                <button class="btn agregar"
                onclick="openModal('${s.nombre} 60 min',${s.precio60},'',\`${s.desc}\`)">
                60 min $${s.precio60}
                </button>

                <button class="btn agregar"
                onclick="openModal('${s.nombre} 90 min',${s.precio90},'',\`${s.desc}\`)">
                90 min $${s.precio90}
                </button>

                <button class="btn detalle"
                onclick="openModal('${s.nombre}',${s.precio60 || s.precio},'',\`${s.desc}\`)">
                Detalle
                </button>
            </div>`
        }

        // 25 y 40
        else if(s.precio25 && s.precio40){

            html += `
            <div class="servicio-item">
                <h3>${s.nombre}</h3>

                <button class="btn agregar"
                onclick="openModal('${s.nombre} 25 min',${s.precio25},'',\`${s.desc}\`)">
                25 min $${s.precio25}
                </button>

                <button class="btn agregar"
                onclick="openModal('${s.nombre} 40 min',${s.precio40},'',\`${s.desc}\`)">
                40 min $${s.precio40}
                </button>

                <button class="btn detalle"
                onclick="openModal('${s.nombre}',${s.precio25},'',\`${s.desc}\`)">
                Detalle
                </button>
            </div>`
        }

        // solo precio
        else{

            html += `
            <div class="servicio-item">
                <h3>${s.nombre}</h3>

                <button class="btn agregar"
                onclick="openModal('${s.nombre}',${s.precio},'',\`${s.desc}\`)">
                $${s.precio}
                </button>

                <button class="btn detalle"
                onclick="openModal('${s.nombre}',${s.precio},'',\`${s.desc}\`)">
                Detalle
                </button>
            </div>`
        }

    })

    document.getElementById("servicios").innerHTML = html
}

// ================================
// MODAL
// ================================
function openModal(nombre, precio, img, desc){

    currentItem = {nombre, precio}

    document.getElementById("modalTitle").innerText = nombre
    document.getElementById("modalDesc").innerText = desc
    document.getElementById("modalPrice").innerText = "$" + precio

    document.getElementById("modalImg").src = img || "images/default.jpg"

    document.getElementById("modalServicio").style.display = "flex"
}

function closeModal(){
    document.getElementById("modalServicio").style.display = "none"
}

// ================================
// AGREGAR DESDE MODAL
// ================================
function addFromModal(){
    addToCart(currentItem.nombre, currentItem.precio)
    closeModal()
}

// ================================
// CARRITO
// ================================
function addToCart(nombre, precio){
    cart.push({nombre, precio})
    updateCart()
    recomendarMejoras(nombre)
}

function updateCart(){

    const lista = document.getElementById("cart")
    lista.innerHTML = ""
    total = 0

    cart.forEach((item,i)=>{
        total += item.precio

        lista.innerHTML += `
        <li class="item-carrito">
            ${item.nombre} - $${item.precio}
            <button onclick="removeItem(${i})">X</button>
        </li>`
    })

    document.getElementById("total").innerText = total
}

function removeItem(i){
    cart.splice(i,1)
    updateCart()
}

// ================================
// CERTIFICADO
// ================================
function setCert(valor){
    document.getElementById("certificadoCantidad").value = valor
}

// ================================
// MEJORAS AUTOMÁTICAS
// ================================
function recomendarMejoras(nombre){

if(sugerenciaMostrada) return

let texto = nombre.toLowerCase()
let html = ""

if(texto.includes("facial")){

html = `
<button class="boton-mejora" onclick="addToCart('Mascarilla 111skin',500); cerrarMejoras()">111skin $500</button>
<button class="boton-mejora" onclick="addToCart('Rodillo jade',300); cerrarMejoras()">Jade $300</button>
<button class="boton-mejora" onclick="addToCart('Mascarilla',400); cerrarMejoras()">Mascarilla $400</button>
`

}else{

html = `
<button class="boton-mejora" onclick="addToCart('Aromaterapia',300); cerrarMejoras()">Aromaterapia</button>
<button class="boton-mejora" onclick="addToCart('Piedras calientes',300); cerrarMejoras()">Piedras</button>
<button class="boton-mejora" onclick="addToCart('Cepillado',300); cerrarMejoras()">Cepillado</button>
`

}

document.getElementById("opcionesMejoras").innerHTML = html
document.getElementById("modalMejoras").style.display = "flex"

sugerenciaMostrada = true
}

function cerrarMejoras(){
document.getElementById("modalMejoras").style.display="none"
sugerenciaMostrada=false
}

// ================================
// PROPINA
// ================================
function toggleTip(){
    let val = document.getElementById("tipOption").value
    document.getElementById("tipAmount").style.display = val === "si" ? "block" : "none"
}

// ================================
// WHATSAPP
// ================================
function sendWhatsApp(){

let nombre = document.getElementById("nombre").value
let destinatario = document.getElementById("destinatario").value
let telefono = document.getElementById("telefono").value
let correo = document.getElementById("correo").value

let mensaje = "✨ Solicitud Spa ✨%0A%0A"

cart.forEach(s=>{
mensaje += `${s.nombre} - $${s.precio}%0A`
})

mensaje += `%0ATotal: $${total}%0A`
mensaje += `Cliente: ${nombre}%0A`
mensaje += `Destinatario: ${destinatario}%0A`
mensaje += `Tel: ${telefono}%0A`
mensaje += `Correo: ${correo}%0A`

// propina
let tip = document.getElementById("tipOption").value
if(tip === "si"){
let monto = document.getElementById("tipAmount").value || 0
mensaje += `Propina: $${monto}%0A`
}else{
mensaje += `Propina: No%0A`
}

let numero = "521XXXXXXXXXX"

window.open(`https://wa.me/${numero}?text=${mensaje}`)
}
