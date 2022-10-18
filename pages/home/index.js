const inputSearchUser = document.querySelector('#user')
const buttonSubmit    = document.querySelector('#submit')

function getInputValue(input, button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            
            button.innerText ='Carregando...'

            let body = document.body
            body.style.cursor = 'progress'
            
            let response = await fetch(`https://api.github.com/users/${input.value}`)

            if (response.status != 200) {
                throw new Error('Usuário não encontrado')
            }

            let user = await response.json()
            localStorage.setItem('userFound', JSON.stringify(user))

            
            window.location.assign("/pages/profile/index.html")
            
        } catch (error) {
            event.preventDefault()
            alert(error.message) 
            button.innerText ='Ver perfil do github'
        }
    })
    
}

getInputValue(inputSearchUser, buttonSubmit)

