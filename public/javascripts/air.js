const aireDato = document.getElementById('airDato')
const aireIcon = document.getElementById('airIcon')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/air/guardar");
            const dato = await response.json();
            if(dato[0].lectura === 1 || dato[0].lectura === -1){
                aireDato.classList.remove("text-danger")
                aireDato.classList.add("text-primary")
                aireIcon.classList.add("bg-light")
                aireIcon.classList.remove("bg-danger")
                aireDato.innerText = 'Buena'
            }else{
                aireDato.classList.remove("text-primary")
                aireDato.classList.add("text-danger")
                aireIcon.classList.remove("bg-light")
                aireIcon.classList.add("bg-danger")
                aireDato.innerText = 'Mala'
            }
            air = document.getElementById('airSensor')
            if(dato[0].lectura === -1){
                aireDato.innerText = "Apagado"
                air.checked = false
            }else{
                air.checked = true
            }
        }catch(e){
            aireDato.classList.remove("text-danger")
                aireDato.classList.add("text-primary")
                aireIcon.classList.add("bg-light")
                aireIcon.classList.remove("bg-danger") 
                aireDato.innerText = "Apagado"
                air.checked = false 
        }   
        await sleep(1000)
    }
}


recibirInformacion()

