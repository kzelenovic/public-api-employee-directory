const gallery = document.querySelector('#gallery');

async function getEmployees(url) {
    try{
        const employeeResponse = await fetch(url);
        const employeeJSON = await employeeResponse.json();
        return employeeJSON.results;
    } catch(error) {
        throw error;
    }
}

async function generateCards(url) {
    const employeeArr = await getEmployees(url);

    for (let i = 0; i < employeeArr.length; i++) {
        const employee = employeeArr[i];
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`)
    }
}

generateCards('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=us');