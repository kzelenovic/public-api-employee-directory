const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');

async function getEmployees(url) {
    try {
        const employeeResponse = await fetch(url);
        const employeeJSON = await employeeResponse.json();
        return employeeJSON.results;
    } catch (error) {
        throw error;
    }
}

const employeeArray = [];

async function generateCards(url) {
    const employeeArr = await getEmployees(url);

    for (let i = 0; i < employeeArr.length; i++) {
        const employee = employeeArr[i];
        employeeArray.push(employee);
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card" js-employee-index="${i}">
            <div class="card-img-container" js-employee-index="${i}">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container" js-employee-index="${i}">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`)
    }
}

function generateModal(index) {
    const modalHTML = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employeeArray[index].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employeeArray[index].name.first} ${employeeArray[index].name.last}</h3>
                <p class="modal-text">${employeeArray[index].email}</p>
                <p class="modal-text cap">${employeeArray[index].location.city}</p>
                <hr>
                <p class="modal-text">${employeeArray[index].phone}</p>
                <p class="modal-text">${employeeArray[index].location.street.number} ${employeeArray[index].location.street.name}, ${employeeArray[index].location.city}, ${employeeArray[index].location.state} ${employeeArray[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${employeeArray[index].dob.date}</p>
            </div>
        </div>
    </div>`;
    return modalHTML;
}

function openModal(index) {
    body.insertAdjacentHTML('afterbegin', generateModal(index));
}

generateCards('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=us');

document.addEventListener('click', (e) => {
    const clicked = e.target;
    const clickedParent = clicked.parentNode;
    if (clicked.className === 'card') {
        openModal(clicked.getAttribute('js-employee-index'));
    } else if (clickedParent.getAttribute('js-employee-index')) {
        openModal(clickedParent.getAttribute('js-employee-index'));
    }

    if(clicked.className === 'modal-close-btn' || clicked.parentNode.className === 'modal-close-btn') {
        const modal = document.querySelector('.modal-container');
        modal.remove();
    }
});