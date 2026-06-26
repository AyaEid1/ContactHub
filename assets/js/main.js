var inputSearch = document.getElementById("searchInput");
var inputName = document.getElementById("inputName");
var inputNumber = document.getElementById("inputNumber");
var inputEmail = document.getElementById("inputEmail");
var inputLocation = document.getElementById("input-adress");
var selectGroup = document.getElementById("select-group");
var inputNotes = document.getElementById("input-notes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var saveBtn = document.getElementById("save-btn");
var saveChangesBtn = document.getElementById("save-changes-btn");
var currentEditIndex = 0;
var contactInfoList = [];

if (localStorage.getItem("containerContact") !== null) {
   contactInfoList = JSON.parse(localStorage.getItem("containerContact"));
  displayContact(); 
}  
displayFavorites();
displayEmergency();
updateStatistics();

function addContact() {
  if(validation(inputName,"contactNameError") && validation(inputNumber,"contactPhoneError") && validation(inputEmail,"contactEmailError")){  
     if (isContactExist(inputNumber.value.trim())) {

          Swal.fire({
              title: "Contact Exists",
              text: "This phone number already exists.",
              icon: "warning"
          });

          return;
      }

  var contact = {
    // PhotoInput: "assets/images/avatar.png",
    initials: inputName.value
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join(""),
    nameUser: inputName.value
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    numberUser: inputNumber.value.trim(),
    emailUser: inputEmail.value.trim(),
    locationUser: inputLocation.value.trim(),
    selectGroupUser: selectGroup.value.trim(),
    notesUser: inputNotes.value.trim(),
    favorite: favoriteInput.checked,
    emergency: emergencyInput.checked,
  }; 
  contactInfoList.push(contact);
  localStorage.setItem("containerContact", JSON.stringify(contactInfoList));
  displayContact();
  displayFavorites();
displayEmergency();
  updateStatistics();
  resetContact();
  Swal.fire({
  title: 'Added',
  text: 'Contact has been added successfully.',
  icon: 'success', 
})
  }else{
    Swal.fire({
  title: 'Error',
  text: 'Please fill in the required fields correctly.',
  icon: 'error', 
})
  }
}
function resetContact() {
  inputName.value = null; 
  inputNumber.value = null;
  inputEmail.value = null;
  inputLocation.value = null;
  selectGroup.value = null;
  inputNotes.value = null;
  favoriteInput.checked = false;
  emergencyInput.checked = false;
  inputName.classList.remove("is-valid", "is-invalid");
  inputNumber.classList.remove("is-valid", "is-invalid");
  inputEmail.classList.remove("is-valid", "is-invalid");
  document.getElementById("contactNameError").classList.add("d-none");
  document.getElementById("contactPhoneError").classList.add("d-none");
  document.getElementById("contactEmailError").classList.add("d-none");
  saveBtn.classList.remove("d-none"); 
saveChangesBtn.classList.add("d-none");
}
function displayContact() {
  if (contactInfoList.length === 0) {
    showEmptyState();
    return;
  }
  var containerContact = "";
  for (var i = 0; i < contactInfoList.length; i++) {
    containerContact += getContainerContact(i);
  }
  document.getElementById("contactsList").innerHTML = containerContact;
}
function deleteContact(index) {
  contactInfoList.splice(index, 1);
  localStorage.setItem("containerContact", JSON.stringify(contactInfoList));
   displayContact(); 
   displayFavorites();
displayEmergency();
   updateStatistics();
}
function showEmptyState() {
  document.getElementById("contactsList").innerHTML = `
    <div class="empty-state col-lg-12">
      <div class="empty-icon">
        <i class="far fa-address-book"></i>
      </div>

      <h4>No contacts found</h4>

      <p>Click "Add Contact" to get started</p>
    </div>
  `;
}
function searchContact() { 
  var searchValue = inputSearch.value.trim().toLowerCase(); 
  var containerContact = "";
  for (var i = 0; i < contactInfoList.length; i++) {
     if (contactInfoList[i].nameUser.trim().toLowerCase().includes(searchValue)== true || contactInfoList[i].numberUser.trim().toLowerCase().includes(searchValue)== true || contactInfoList[i].emailUser.trim().toLowerCase().includes(searchValue)== true) {
    containerContact +=  getContainerContact(i);
  }
 }
  document.getElementById("contactsList").innerHTML = containerContact;  
}
function getContainerContact(i){
  return `
      <div class="col-lg-6 mb-4">
                  <div class="contact-card">
                    <div class="contact-body">
                      <div class="d-flex align-items-start gap-3">
                        <div class="avatar-wrapper">
                          <div class="avatar-contact">${contactInfoList[i].initials}</div>
                          ${
                            contactInfoList[i].emergency
                              ? `<span class="heart-badge">
   <i class="fas fa-heart-pulse"></i>
 </span>`
                              : ""
                          }

                          ${
                            contactInfoList[i].favorite
                              ? `    <span class="favorite-badge">  <i class="fas fa-star"></i>
                          </span>`
                              : ""
                          }
                         
                        
                        </div>

                        <div class="flex-grow-1">
                          <h5 class="contact-name">${contactInfoList[i].nameUser.split(' ').slice(0, 2).join(' ')}</h5>

                          <div class="contact-item">
                            <span class="info-icon phone">
                              <i class="fas fa-phone"></i>
                            </span>

                            <span>${contactInfoList[i].numberUser}</span>
                          </div>
                        </div>
                      </div>
                      <div class="anther-info">
                       ${
                         contactInfoList[i].emailUser
                           ? ` 
                        <div class="contact-item">
                          <span class="info-icon email">
                            <i class="fas fa-envelope"></i>
                          </span> 
                          <span>${contactInfoList[i].emailUser}</span>
                        </div> `
                           : ""
                       }

                       ${
                         contactInfoList[i].locationUser
                           ? ` <div class="contact-item">
                           <span class="info-icon location">
                             <i class="fas fa-location-dot"></i>
                           </span>

                           <span>${contactInfoList[i].locationUser}</span>
                         </div>`
                           : ""
                       }
                     
                      </div>
                      <div class="contact-tags">
                      ${
                        contactInfoList[i].selectGroupUser
                          ? `<span class="tag school"> ${contactInfoList[i].selectGroupUser} </span> `
                          : ""
                      }
                         
                          ${
                            contactInfoList[i].emergency
                              ? `<span class="tag emergency"> <i class="fas fa-heart-pulse"></i>
                              Emergency
                          </span>`
                              : ""
                          }
                          
                     
                        </div>
                    </div>

                    <div class="contact-footer">
                      <div class="left-actions">
                      ${
                        contactInfoList[i].numberUser
                          ? ` <a class="action-btn call" href="tel:${contactInfoList[i].numberUser}">
                          <i class="fas fa-phone"></i>
                        </a> `
                          : ""
                      }
                       ${
                         contactInfoList[i].emailUser
                           ? ` <a class="action-btn mail" href="mailto:${contactInfoList[i].emailUser}">
                          <i class="fas fa-envelope"></i>
                        </a>`
                           : ""
                       }
                       
                      </div>

                      <div class="right-actions">
                        <button class="action-btn favorite ${
  contactInfoList[i].favorite ? 'active' : ''
}" onclick="toggleFavorite(${i})">
                          <i class="fas fa-star"></i>
                        </button>

                        <button class="action-btn heart ${
  contactInfoList[i].emergency ? 'active' : ''
}" onclick="toggleEmergency(${i})">
                          <i class="fas fa-heart-pulse"></i>
                        </button>

                        <button class="action-btn edit" onclick="editContact(${i})" data-bs-toggle="modal"
              data-bs-target="#exampleModal">
                          <i class="fas fa-pen"></i>
                        </button>

                        <button class="action-btn delete" onclick="deleteContact(${i})">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
     
     `;
}
function editContact(index) {
  currentEditIndex = index;
   inputName.value = contactInfoList[index].nameUser;
  inputNumber.value = contactInfoList[index].numberUser;
  inputEmail.value = contactInfoList[index].emailUser;
  inputLocation.value = contactInfoList[index].locationUser;
  selectGroup.value = contactInfoList[index].selectGroupUser;
  inputNotes.value = contactInfoList[index].notesUser; ;
favoriteInput.checked = contactInfoList[index].favorite;
  emergencyInput.checked = contactInfoList[index].emergency;
    saveBtn.classList.add("d-none");
   saveChangesBtn.classList.remove("d-none");
  
}

// function saveEditContact() { 
  
//     if (isContactExist(inputNumber.value.trim(), currentEditIndex)) {

//     Swal.fire({
//       title: "Contact Exists",
//       text: "This phone number already exists.",
//       icon: "warning"
//     });

//     return;
//   }
//    var contact = { 
//     initials: inputName.value
//       .trim()
//       .split(" ")
//       .slice(0, 2)
//       .map((word) => word.charAt(0).toUpperCase())
//       .join(""),
//     nameUser: inputName.value
//       .trim()
//       .split(" ")
//       .slice(0, 2)
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" "),
//     numberUser: inputNumber.value.trim(),
//     emailUser: inputEmail.value.trim(),
//     locationUser: inputLocation.value.trim(),
//     selectGroupUser: selectGroup.value,
//     notesUser: inputNotes.value.trim(),
//     favorite: favoriteInput.checked,
//     emergency: emergencyInput.checked,
//   };
//   contactInfoList.splice(currentEditIndex, 1, contact);
//   isContactExist(
//     inputNumber.value.trim(),
//     currentEditIndex
// )
//   localStorage.setItem("containerContact", JSON.stringify(contactInfoList));
//   displayContact();
//   resetContact();
//   saveBtn.classList.remove("d-none"); ;
//   saveChangesBtn.classList.add("d-none");
 
// }


function saveEditContact() {

  if (
    !validation(inputName, "contactNameError") ||
    !validation(inputNumber, "contactPhoneError") ||
    !validation(inputEmail, "contactEmailError")
  ) {
    Swal.fire({
      title: "Error",
      text: "Please fill in the required fields correctly.",
      icon: "error"
    });

    return;
  }

  if (isContactExist(inputNumber.value.trim(), currentEditIndex)) {
    Swal.fire({
      title: "Contact Exists",
      text: "This phone number already exists.",
      icon: "warning"
    });

    return;
  }

  var contact = {
    initials: inputName.value
      .trim()
      .split(" ")
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join(""),

    nameUser: inputName.value
      .trim()
      .split(" ")
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),

    numberUser: inputNumber.value.trim(),
    emailUser: inputEmail.value.trim(),
    locationUser: inputLocation.value.trim(),
    selectGroupUser: selectGroup.value.trim(),
    notesUser: inputNotes.value.trim(),
    favorite: favoriteInput.checked,
    emergency: emergencyInput.checked,
  };

  contactInfoList.splice(currentEditIndex, 1, contact);

  localStorage.setItem(
    "containerContact",
    JSON.stringify(contactInfoList)
  );

  displayContact();
  displayFavorites();
displayEmergency();
  updateStatistics();
  resetContact();

  saveBtn.classList.remove("d-none");
  saveChangesBtn.classList.add("d-none");

  Swal.fire({
    title: "Updated",
    text: "Contact updated successfully.",
    icon: "success"
  });
}
updateStatistics()
function validation(element ,msId){
var text = element.value;
var regex = { 
inputName:/^[A-Za-z\s]{2,50}$/,
inputNumber:/^01[0125][0-9]{8}$/,
inputEmail:/^$|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
}
var msId =document.getElementById(msId)
if(regex[element.id].test(text)){
element.classList.add("is-valid");
element.classList.remove("is-invalid");
msId.classList.add("d-none");
return true
}
else{
element.classList.add("is-invalid");
element.classList.remove("is-valid");
msId.classList.remove("d-none");
return false
}
}
/***********/
 function displayFavorites() {

    var container = "";

    for (var i = 0; i < contactInfoList.length; i++) {

        if (contactInfoList[i].favorite == true) {

            container += `
            
            <div class="favorite-item d-flex justify-content-between align-items-center mb-3">

                <div class="d-flex align-items-center gap-2">

                    <div class="avatar-contact">
                        ${contactInfoList[i].initials}
                    </div>

                    <div class="side-info">

                        <h6 class="side-name">
                            ${contactInfoList[i].nameUser}
                        </h6>

                        <small class="side-number">
                            ${contactInfoList[i].numberUser}
                        </small>

                    </div>

                </div>

                <a href="tel:${contactInfoList[i].numberUser}" class="favorite-call">
                    <i class="fas fa-phone"></i>
                </a>

            </div>

            `;

        }

    }

    if (container == "") {

        container = "No favorites yet";

    }

    document.getElementById("favoriteList").innerHTML = container;

}
 function displayEmergency() {

    var container = "";

    for (var i = 0; i < contactInfoList.length; i++) {

        if (contactInfoList[i].emergency == true) {

            container += `
            
            <div class="favorite-item d-flex justify-content-between align-items-center mb-3">

                <div class="d-flex align-items-center gap-2">

                    <div class=" avatar-contact">
                        ${contactInfoList[i].initials}
                    </div>

                    <div class="side-info">

                        <h6 class="side-name">
                            ${contactInfoList[i].nameUser}
                        </h6>

                        <small class="side-number">
                            ${contactInfoList[i].numberUser}
                        </small>

                    </div>

                </div>

                <a href="tel:${contactInfoList[i].numberUser}" class="emergency-call">
                    <i class="fas fa-phone"></i>
                </a>

            </div>

            `;

        }

    }

    if (container == "") {

        container = "No emergency contacts";

    }

    document.getElementById("emergencyList").innerHTML = container;

}
function isContactExist(phone, currentIndex = -1){

    for(var i=0; i<contactInfoList.length; i++){

        if(
            contactInfoList[i].numberUser == phone &&
            i != currentIndex
        ){

            return true;

        }

    }

    return false;

}
function updateStatistics() {

  var favoriteCount = 0;
  var emergencyCount = 0;

  for (var i = 0; i < contactInfoList.length; i++) {

    if (contactInfoList[i].favorite == true) {
      favoriteCount++;
    }

    if (contactInfoList[i].emergency == true) {
      emergencyCount++;
    }

  }

  document.getElementById("favoriteContacts").innerHTML = favoriteCount;

  document.getElementById("emergencyContacts").innerHTML = emergencyCount;

  document.getElementById("totalContacts").innerHTML =
    favoriteCount + emergencyCount;

}
 function toggleFavorite(index) {
  contactInfoList[index].favorite =
    !contactInfoList[index].favorite;

  localStorage.setItem(
    "containerContact",
    JSON.stringify(contactInfoList)
  );

  displayContact();
  displayFavorites();
displayEmergency();
  updateStatistics();
}
function toggleEmergency(index) {
  contactInfoList[index].emergency =
    !contactInfoList[index].emergency;

  localStorage.setItem(
    "containerContact",
    JSON.stringify(contactInfoList)
  );

  displayContact();
  displayFavorites();
displayEmergency();
  updateStatistics();
}
