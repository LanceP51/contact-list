// api methods
const apiMethods = {
    fetchAllContacts: () => {
        return fetch("http://localhost:3000/contacts")
            .then(response => response.json())
    },
    postContact: (newContact) => {
        return fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })
    },
    deleteContact: (trashContactID) => {
        return fetch(`http://localhost:3000/contacts/${trashContactID}`, {
            method: "DELETE"
        })
    },
    // fetchOneContact:
    // editContact:
}

// print all contacts to DOM
const domMethods = {
    printAllDom: (contactCard) => {
        const contactsList = document.querySelector("#contactContainer")
        contactCard.forEach(contact => {
            contactsList.innerHTML += `<div class="eachContactsDiv">
            <h3>${contact.name}</h3>
            <h5>${contact.number}</h5>
            <h5>${contact.email}</h5>
        <button id="deleteBtn-${contact.id}">Delete</button>
        <button id="editBtn-${contact.id}">Edit</button>
        </div>`
        });

    }
}

// call api fetch and print all contact cards to DOM
apiMethods.fetchAllContacts()
    .then(contacts => {
        domMethods.printAllDom(contacts);
    });

// eventListner on "save" button to collect field values, build them into a new object and then POST them to database
const saveBtn = document.querySelector("#saveBtn")
saveBtn.addEventListener("click", () => {
    const nameInput = document.querySelector("#nameInput").value
    const numberInput = document.querySelector("#numberInput").value
    const emailInput = document.querySelector("#emailInput").value
    const newContact = {
        name: nameInput,
        number: numberInput,
        email: emailInput,
    }
    apiMethods.postContact(newContact)
        .then(apiMethods.fetchAllContacts)
        .then(contacts => {
            document.querySelector("#contactContainer").innerHTML=""
            domMethods.printAllDom(contacts);
        });
})

// eventListener for Delete Btn to Delete one contact from db selected by the individual id
document.querySelector("body").addEventListener("click", () => {
    if (event.target.id.includes("deleteBtn")) {
        const deleteID = event.target.id.split("-")[1];
        apiMethods.deleteContact(deleteID)
            .then(apiMethods.fetchAllContacts)
            .then(contacts => {
                document.querySelector("#contactContainer").innerHTML=""
                domMethods.printAllDom(contacts);
            });
    }
})

// event listener for EDIT button: this should GET our one contact we want to edit and print it to a DOM element for editing. This DOM element need to pre-fill values to input fields and have a SAVE Btn. Then the included Submit button should have another Listener for saving those new values and PUT them to the db.

// document.querySelector("body").addEventListener("click", () => {
//     if (event.target.id.includes("deleteBtn")) {
//         const deleteID = event.target.id.split("-")[1];
        // call method GetOneContact