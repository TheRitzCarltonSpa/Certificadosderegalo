let cart = [];
let total = 0;

/* =========================
   🔵 SPLASH
========================= */
window.addEventListener("load", () => {
    setTimeout(()=>{
        document.getElementById("splash").classList.add("fade-out");

        setTimeout(()=>{
            document.getElementById("splash").style.display="none";
            document.getElementById("app").classList.add("show");
        },1000);

    },1500);
});

/* =========================
   📦 SERVICIOS REALES
   🔧 AQUÍ PUEDES EDITAR TODO
========================= */

const servicios = {
bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en tradiciones Aztecas y la luna llena. Ritual curativo con salvia y piedras de sal."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Tratamiento con tecnologia prebiótica inspirado en Kobido japonés."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Experiencia en cabina de parejas."},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda."},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Alivio muscular."},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Revitalización."},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Ideal para deportistas."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Incluye piedras calientes."},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Relajación profunda."},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Para embarazadas."}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Adaptado a la piel."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Anti envejecimiento."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Resultados inmediatos."},
{nombre:"Hydrafacial",precio60:4500,desc:"Tecnología avanzada."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Energía inmediata."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Rápido y eficaz."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Renueva la piel."},
{nombre:"Tratamiento corporal equilibrante",precio:2600,desc:"Relajación total."},
{nombre:"Tratamiento corporal nutritivo",precio:2600,desc:"Piel luminosa."},
{nombre:"Power hour",precio:2400,desc:"Estimulación total."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Renueva piel"},
{nombre:"Piedras calientes",precio:300,desc:"Relajación"},
{nombre:"Mascarilla plástica",precio:400,desc:"Nutrición"},
{nombre:"Aromaterapia",precio:300,desc:"Aceites"},
{nombre:"Mascarilla 111skin",precio:500,desc:"Hidratación"},
{nombre:"Exfoliación",precio:450,desc:"Suavidad"},
{nombre:"Balsamo cuello",precio:300,desc:"Firmeza"},
{nombre:"Parches ojos",precio:400,desc:"Mejora tono"}
]
};

/* =========================
   🧴 GENERAR UI
========================= */

const categorias = document.getElementById("categorias");

Object.keys(servicios).forEach(cat => {

    let div = document.createElement("div");
    div.className = "categoria";

    div.innerHTML = `
        <!-- 🔧 CAMBIAR IMAGEN -->
        <div class="categoria-header" style="background-image:url('${cat}.jpg')">
            <h3>${cat.toUpperCase()}</h3>
        </div>

        <div class="tratamientos">
            ${generarServicios(cat)}
        </div>
    `;

    div.querySelector(".categoria-header").onclick = ()=>{
        div.classList.toggle("active");
    };

    categorias.appendChild(div);
});

/* =========================
   🔥 GENERADOR INTELIGENTE
========================= */

function generarServicios(cat){

    return servicios[cat].map(serv => {

        let botones = "";

        // 👉 CASO: precio único
        if(serv.precio){
            botones += `
            <button onclick="openUpgrade('${cat}','${serv.nombre}',${serv.precio})">
                Agregar $${serv.precio}
            </button>`;
        }

        // 👉 CASO: múltiples precios
        Object.keys(serv).forEach(key=>{
            if(key.startsWith("precio") && key !== "precio"){

                let duracion = key.replace("precio","");
                let precio = serv[key];

                botones += `
                <button onclick="openUpgrade('${cat}','${serv.nombre} ${duracion}min',${precio})">
                    ${duracion}min $${precio}
                </button>`;
            }
        });

        return `
        <div class="tratamiento">
            <div>
                <strong>${serv.nombre}</strong>
            </div>

            <div>
                ${botones}
                <button onclick="openDetail(\`${serv.desc}\`)">Detalle</button>
            </div>
        </div>`;
    }).join("");
}

/* =========================
   🛒 CARRITO
========================= */

function addToCart(name,price){
    cart.push({name,price});
    total+=price;
    renderCart();
}

function renderCart(){
    let div=document.getElementById("cart");
    div.innerHTML="";

    cart.forEach((item,i)=>{
        div.innerHTML+=`
        <p>${item.name} - $${item.price}
        <button onclick="removeItem(${i})">X</button></p>`;
    });

    document.getElementById("total").innerText="Total: $"+total;
}

function removeItem(i){
    total-=cart[i].price;
    cart.splice(i,1);
    renderCart();
}

/* =========================
   💎 MEJORAS
========================= */

function openUpgrade(cat,name,price){

    let mejoras = servicios.mejoras;

    let div=document.getElementById("upgradeOptions");
    div.innerHTML="";

    mejoras.forEach(m=>{
        div.innerHTML+=`
        <button onclick="selectUpgrade('${name}','${m.nombre}',${price},${m.precio})">
            ${m.nombre} +$${m.precio}
        </button>`;
    });

    document.getElementById("upgradeModal").style.display="block";
}

function selectUpgrade(name,upgrade,price,extra){
    addToCart(name+" + "+upgrade,price+extra);
    closeUpgrade();
}

function closeUpgrade(){
    document.getElementById("upgradeModal").style.display="none";
}

/* =========================
   🌑 MODAL
========================= */

function openDetail(text){
    document.getElementById("modal").style.display="block";
    document.getElementById("modalText").innerText=text;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

/* =========================
   💰 PROPINA
========================= */

function toggleTip(){
    let val=document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display=val==="Si"?"block":"none";
}

/* =========================
   📲 WHATSAPP
========================= */

function sendWhatsApp(){

    let tel=document.getElementById("telefono").value;
    let tip=document.getElementById("tipAmount").value||0;

    let msg="Pedido Spa:\n\n";

    cart.forEach(i=>{
        msg+=`${i.name} - $${i.price}\n`;
    });

    msg+=`\nTotal: $${total}`;
    msg+=`\nPropina: $${tip}`;

    window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`);
}
