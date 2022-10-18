const body            = document.querySelector('body')
const inputSearchUser = document.querySelector('#user')
const buttonSubmit    = document.querySelector('#submit')
const spanError       = document.querySelector('.not-found')
const spanLoading     = document.querySelector('#spanLoading')


let recentUsers = [JSON.parse(localStorage.getItem('recentUsers'))]
console.log(recentUsers)

function getInputValue(input, button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            spanLoading.innerText = ''
            spanLoading.className = 'loading'
            body.style.cursor = 'progress'
            
            let response = await fetch(`https://api.github.com/users/${input.value}`)

            if (response.status != 200) {
                throw new Error('Usuário não encontrado')
            }

            let user = await response.json()

            localStorage.setItem('userFound', JSON.stringify(user))

            
            window.location.assign("/pages/profile/index.html")
            
        } catch(error) {
            spanLoading.classList.remove('loading')
            spanLoading.innerText ='Ver perfil do github'
            body.style.cursor = 'auto'
            spanError.style.display = 'block'
            spanError.innerText = `${error.message}`
        }
    })
    
}

getInputValue(inputSearchUser, buttonSubmit)