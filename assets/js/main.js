// import Swal from "sweetalert2";
// const Swal = require("sweetalert2");
// var PhotoInput = document.getElementById("input-photo");
var inputName = document.getElementById("input-name");
var inputNumber = document.getElementById("input-number");
var inputEmail = document.getElementById("input-email");
var inputLocation = document.getElementById("input-adress");
var selectGroup = document.getElementById("select-group");
var inputNotes = document.getElementById("input-notes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var saveBtn = document.getElementById("save-btn");
var contactInfoList = [];

if (localStorage.getItem("contactInfoList") == null) {
  var emptyList = `
            <div class="empty-state col-lg-12">
                  <div class="empty-icon">
                    <i class="far fa-address-book"></i>
                  </div>

                  <h4>No contacts found</h4>

                  <p>Click "Add Contact" to get started</p>
                </div>
    `;
  document.getElementById("contactsList").innerHTML = emptyList;
} else {
  contactInfoList = JSON.parse(localStorage.getItem("contactInfoList"));
  displayContact();
}

function addContact() {
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
    emailUser: inputEmail.value,
    locationUser: inputLocation.value,
    selectGroupUser: selectGroup.value,
    notesUser: inputNotes.value,
    favorite: favoriteInput.checked,
    emergency: emergencyInput.checked,
  };
  contactInfoList.push(contact);
  localStorage.setItem("contactInfoList", JSON.stringify(contactInfoList));
  displayContact();
  resetContact();
}
function resetContact() {
  inputName.value = null;
  inputName.value = null;
  inputNumber.value = null;
  inputEmail.value = null;
  inputLocation.value = null;
  selectGroup.value = null;
  inputNotes.value = null;
  favoriteInput.checked = false;
  emergencyInput.checked = false;
}
function displayContact() {
  var containerContact = "";
  for (var i = 0; i < contactInfoList.length; i++) {
    containerContact += `
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
                          <h5 class="contact-name">${contactInfoList[i].nameUser}</h5>

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
                        <button class="action-btn favorite">
                          <i class="fas fa-star"></i>
                        </button>

                        <button class="action-btn heart">
                          <i class="fas fa-heart-pulse"></i>
                        </button>

                        <button class="action-btn edit"data-bs-toggle="modal"
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
  document.getElementById("contactsList").innerHTML = containerContact;
}
function deleteContact(index) {
  contactInfoList.splice(index, 1);
  localStorage.setItem("contactInfoList", JSON.stringify(contactInfoList));

   if (contactInfoList.length === 0) {
     var emptyList = `
            <div class="empty-state col-lg-12">
                  <div class="empty-icon">
                    <i class="far fa-address-book"></i>
                  </div>

                  <h4>No contacts found</h4>

                  <p>Click "Add Contact" to get started</p>
                </div>
    `;
     document.getElementById("contactsList").innerHTML = emptyList;
   } else {
     contactInfoList = JSON.parse(localStorage.getItem("contactInfoList"));
     displayContact();
   }
}
