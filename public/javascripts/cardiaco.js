const cardiacoDato = document.getElementById('cardiacoDato')
const cardiacoIcon = document.getElementById('cardiacoIcon')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/cardiaco/guardar");
            const dato = await response.json();
            if((dato[0].lectura >= 60 && dato[0].lectura<= 100) || dato[0].lectura === -1){
                cardiacoDato.classList.remove("text-danger")
                cardiacoDato.classList.add("text-primary")
                cardiacoIcon.classList.add("bg-light")
                cardiacoIcon.classList.remove("bg-danger")  
            }else{
                cardiacoDato.classList.remove("text-primary")
                cardiacoDato.classList.add("text-danger")
                cardiacoIcon.classList.remove("bg-light")
                cardiacoIcon.classList.add("bg-danger")
            }
            if(dato[0].lectura === -1){
                cardiacoDato.innerText = "Apagado"
                card = document.getElementById('cardiacoSensor')
                card.checked = false
            }else{
                cardiacoDato.innerText = dato[0].lectura  
                card.checked = true
            }
        }catch(e){
            console.log(e)
            await sleep(4000)
        }   
        await sleep(1000)
    }
}

recibirInformacion()