const body            = document.querySelector('body')
const divRecentUsers  = document.querySelector('#recentUsers')
const inputSearchUser = document.querySelector('#user')
const buttonSubmit    = document.querySelector('#submit')
const spanError       = document.querySelector('.not-found')
const spanLoading     = document.querySelector('#spanLoading')


let recentUsers = []

if (JSON.parse(localStorage.getItem('recentUsers')) !== null) {
    JSON.parse(localStorage.getItem('recentUsers')).forEach((user) => {
        recentUsers.unshift(user)

        let anchorLinkImg = document.createElement('a')
        anchorLinkImg.href = "/pages/profile/index.html"

        anchorLinkImg.addEventListener('click', () => localStorage.setItem('userFound', JSON.stringify(user)))

        let imgUser = document.createElement('img')
        imgUser.src = `${user.avatar_url}`

        anchorLinkImg.appendChild(imgUser)
        divRecentUsers.appendChild(anchorLinkImg)
    })
}

function getInputValue(input, button) {
    input.addEventListener('keyup', () => {
        if (input.value !== ''){
            button.removeAttribute('disabled')
            button.classList.remove('disabled')
        } else{
            button.setAttribute('disabled', true)
            button.classList.add('disabled')
        }
    })
    
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


            recentUsers.unshift(user)
            recentUsers.splice(3, 1)
            localStorage.setItem('recentUsers', JSON.stringify(recentUsers))
            console.log(recentUsers)

            
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