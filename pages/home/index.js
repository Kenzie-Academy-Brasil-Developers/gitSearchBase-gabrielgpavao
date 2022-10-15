const body            = document.querySelector('body')
const inputSearchUser = document.querySelector('#user')
const buttonSubmit    = document.querySelector('#submit')
const spanError       = document.querySelector('.not-found')


let recentUsers = [JSON.parse(localStorage.getItem('recentUsers'))]
console.log(recentUsers)

function getInputValue(input, button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            button.innerText ='Carregando...'
            body.style.cursor = 'progress'
            
            let response = await fetch(`https://api.github.com/users/${input.value}`)

            if (response.status != 200) {
                throw new Error('Usuário não encontrado')
            }

            let user = await response.json()

            localStorage.setItem('userFound', JSON.stringify(user))

            
            // recentUsers.splice(2, 1)
            // recentUsers.unshift(user)
            // localStorage.setItem('recentUsers', JSON.stringify(recentUsers))
            // console.log(recentUsers)

            window.location.assign("http://127.0.0.1:5501/pages/profile/index.html")
            
        } catch(error) {
            button.innerText ='Ver perfil do github'
            body.style.cursor = 'auto'
            spanError.style.display = 'block'
            spanError.innerText = `${error.message}`
        }
    })
    
}

getInputValue(inputSearchUser, buttonSubmit)