var PhotoInput = document.getElementById("input-photo"); 
var inputName = document.getElementById("input-name");
var inputNumber = document.getElementById("input-number");
var selectGroup = document.getElementById("select-group");
var inputNotes = document.getElementById("input-notes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");
var saveBtn = document.getElementById("save-btn");
var contactInfoList=[]
function addContact(){
    contact ={
        nameUser : inputName.value,
        numberUser : inputNumber.value,
   selectGroupUser : selectGroup.value,
      notesUser : inputNotes.value,  
        favorite: favoriteInput.checked,
        emergency: emergencyInput.checked
    }
    console.log(contact);
    contactInfoList.push([contact]);
    console.log(contactInfoList);
    resetContact()
}
function resetContact(){ 
        inputName.value = null;
        inputNumber.value = null;
    selectGroup.value = null;
       inputNotes.value = null;
         favoriteInput.checked = false;
        emergencyInput.checked = false;
    
}
 