fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=us')
    .then(res => res.json())
    .then(data => generateCard(data.results))
    .catch(err => console.log(err));

const gallery = document.querySelector('#gallery');

function generateCard(data) {
    console.log(data)
    console.log(data[0].name.first)
    for (let i = 0; i < data.length; i++) {
        const person = data[i];
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`)
    }
}