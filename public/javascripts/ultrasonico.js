const ultraDato = document.getElementById('ultraDato')
const ultraIcon = document.getElementById('ultraIcon')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/ultrasonico/alert");
            const dato = await response.json();
            if(!dato[0].estado){
                ultraDato.classList.remove("text-danger")
                ultraDato.classList.add("text-primary")
                ultraIcon.classList.add("bg-light")
                ultraIcon.classList.remove("bg-danger")  
                ultraDato.innerText = "OK"
            }else{
                ultraDato.classList.remove("text-primary")
                ultraDato.classList.add("text-danger")
                ultraIcon.classList.remove("bg-light")
                ultraIcon.classList.add("bg-danger")
                ultraDato.innerText = "Alerta" 
            }
        }catch(e){
            ultraDato.classList.remove("text-danger")
            ultraDato.classList.add("text-primary")
            ultraIcon.classList.add("bg-light")
            ultraIcon.classList.remove("bg-danger")  
            ultraDato.innerText = "--"
        }   
        await sleep(1000)
    }
}


recibirInformacion()

