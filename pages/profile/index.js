const userData = JSON.parse(localStorage.getItem('userFound'))
console.log(userData.repos_url)


function insertDataHeader(obj){
    let imgProfile    = document.querySelector('#profileImg')
    let h2ProfileName = document.querySelector('#profileName')
    let pJob          = document.querySelector('#profileJob')
    let aLinkEmail    = document.querySelector('#profileEmail')
    
    imgProfile.src = obj.avatar_url
    h2ProfileName.innerText = obj.name
    pJob.innerText = obj.bio
    aLinkEmail.setAttribute('href', `mailto:${obj.email}`)
}
insertDataHeader(userData)



const ulRepositoryList = document.querySelector('.repository-list')

function createRepositoryCard (currentRep) {
    let liRepositoryCard       = document.createElement('li')
    let h3RepositoryName       = document.createElement('h3')
    let pRepositoryDescription = document.createElement('p')
    let divButtons             = document.createElement('div')
    let buttonRepository       = document.createElement('button')
    let buttonDemo             = document.createElement('button')


    liRepositoryCard.className       = 'repository-card'
    h3RepositoryName.innerText       = `${currentRep.name}`
    pRepositoryDescription.innerText = `${currentRep.description}`
    buttonRepository.className       = 'repository-button'
    buttonRepository.innerText       = 'Repositório'
    buttonRepository.addEventListener('click', () => {
        window.location.assign(`${currentRep.html_url}`)
    })

    buttonDemo.className             = 'demo'
    buttonDemo.innerText             = 'Demo'


    divButtons.append(buttonRepository, buttonDemo)
    liRepositoryCard.append(h3RepositoryName, pRepositoryDescription, divButtons)
    ulRepositoryList.append(liRepositoryCard)
        
}


async function insertDataRepository (obj) {
    let repositories = await (await fetch(obj.repos_url)).json()
    repositories.forEach(element => {
        createRepositoryCard(element)
    });
}
insertDataRepository(userData)