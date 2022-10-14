const userData = JSON.parse(localStorage.getItem('userFound'))
console.log(userData)


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