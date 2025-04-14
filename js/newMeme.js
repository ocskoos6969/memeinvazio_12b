const iconHome = document.querySelector('.icon-home');
const iconUser = document.querySelector('.icon-user');
const iconLogout = document.querySelector('.icon-logout');
const fileUpload = document.getElementById('#fileUpload');
let meme = null;
const newMeme = document.querySelector('.newMeme');
const uploadButton = document.querySelector('.uploadButton');

iconHome.addEventListener('click', () => {
    window.location.href = '../html/home.html'
})

iconUser.addEventListener('click', () => {    
    window.location.href = '../html/profile.html'
})



iconLogout.addEventListener('click', logout);

fileUpload.addEventListener('change', selectPicture);

uploadButton.addEventListener('click', uploadMeme);

async function logout(){
    const response = await fetch('http://127.0.0.1:3000/', {
    method: 'POST',
    credentials: 'included'
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = '../index.html';
    } else {
        alert('Hiba a kijelentkezéskor!');0
    }


}

function selectPicture() {
    const file = fileUpload.files[0];
    //console.log(file);

    if (file) {
        meme = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            newMeme.style.backgroundImage = `url('${event.target.result}')`;
        }
        reader.readAsDataURL(file);
    }
}

async function uploadMeme() {
    if (meme) {
        const formData = new FormData;
        formData.append('meme', meme);
        try{
            const response = await fetch('http://127.0.0.1:3000/api/memes/uploadMeme', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
        } catch {
            alert('Nem várt hiba!')
        }
    } else {
        alert('Válassz ki egy képet!');
    }
}