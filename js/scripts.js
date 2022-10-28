const body = document.querySelector('body');
const gallery = document.querySelector('#gallery');

// Will hold array of fetched employee data objects
const employeeArray = [];

/**
 * Returns an array of objects of employee data.
 * @param {string} url path to resource to fetch
 * @returns {array} employee objects
 */
async function getEmployees(url) {
    try {
        const employeeResponse = await fetch(url);
        const employeeJSON = await employeeResponse.json();
        return employeeJSON.results;
    } catch (error) {
        throw error;
    }
}

/**
 * Generate card with employee data and print 12 cards onto page.
 * @param {string} url path to resource to fetch
 */
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

/**
 * Converts date of birth from date-time format to 'MM/DD/YYYY'
 * @param {string} dob date of birth from employee data
 * @returns {string}
 */
function convertDate(dob) {
    let date = dob;
    let regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/;
    let replacement = '$2-$3-$1';
    return date.replace(regex, replacement);
}

/**
 * Generates modal HTML using data from employeeArray and 
 * @param {number} index value held in a card's 'js-employee-index' attribute
 * @returns {string}
 */
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
                <p class="modal-text">Birthday: ${convertDate(employeeArray[index].dob.date)}</p>
            </div>
        </div>
    </div>`;
    return modalHTML;
}

/**
 * Appends modal HTML to body of document.
 * @param {number} index value held in a card's 'js-employee-index' attribute
 */
function openModal(index) {
    body.insertAdjacentHTML('afterbegin', generateModal(index));
}

function printResults(arr) {
    gallery.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const employee = arr[i];
        gallery.insertAdjacentHTML('beforeend', `<div class="card" js-employee-index="${i}">
        <div class="card-img-container" js-employee-index="${i}">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container" js-employee-index="${i}">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`);
    }
}

generateCards('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=us');

document.addEventListener('click', (e) => {
    const clicked = e.target;
    const clickedParent = clicked.parentNode;

    if (clicked.className === 'card') {
        modalIndex = clicked.getAttribute('js-employee-index');
        openModal(clicked.getAttribute('js-employee-index'));
    } else if (clickedParent.getAttribute('js-employee-index')) {
        modalIndex = clickedParent.getAttribute('js-employee-index');
        openModal(clickedParent.getAttribute('js-employee-index'));
    }

    const modal = document.querySelector('.modal-container');

    if (clicked.className === 'modal-close-btn' || clickedParent.className === 'modal-close-btn') {
        modal.remove();
    }

    if (clicked === modal) {
        modal.remove();
    }
});