const ambienteDato = document.getElementById('ambDato')
const ambienteIcon = document.getElementById('ambIcon')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/ambiente/guardar");
            const dato = await response.json();
            if((dato[0].lectura >= 20 && dato[0].lectura<=28) || dato[0].lectura === -1){
                ambienteDato.classList.remove("text-danger")
                ambienteDato.classList.add("text-primary")
                ambienteIcon.classList.add("bg-light")
                ambienteIcon.classList.remove("bg-danger")  
            }else{
                ambienteDato.classList.remove("text-primary")
                ambienteDato.classList.add("text-danger")
                ambienteIcon.classList.remove("bg-light")
                ambienteIcon.classList.add("bg-danger")
            }
            if(dato[0].lectura === -1){
                ambienteDato.innerText = "Apagado"
                amb = document.getElementById('ambSensor')
                amb.checked = false
            }else{
                ambienteDato.innerText = dato[0].lectura  
                amb.checked = true
            }
        }catch(e){
            ambienteDato.classList.remove("text-danger")
            ambienteDato.classList.add("text-primary")
            ambienteIcon.classList.add("bg-light")
            ambienteIcon.classList.remove("bg-danger")  
            ambienteDato.innerText = "Apagado"
            amb = document.getElementById('ambSensor')
            amb.checked = false
        }   
        await sleep(1000)
    }
}

recibirInformacion()