//Console.log Google Font
document.fonts.load("1em 'Poppins'").then(function () {
    console.log("Poppins has loaded.");
}).catch(function () {
    console.log("Poppins failed to load.");
    // Implement fallback logic here
});

document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('sidebar-toggle');
    var sidebar = document.querySelector('.sidebar');
    var avatarBox = sidebar.querySelector('.avatar-box'); // Selects the avatar-box inside the sidebar
    var name = sidebar.querySelector('#info-content-name');
    var contactsBtn = sidebar.querySelector('#info_more-btn');
    var contactsItems = sidebar.querySelector('.sidebar-info-more');

    sidebar.style.width = '25%'; 
    toggleButton.dataset.state = 'Expand';
    toggleButton.addEventListener('click', function () {
        if (toggleButton.dataset.state === 'Expand') {
            toggleButton.innerHTML = 'Expand <ion-icon name="expand-outline"></ion-icon>';
            toggleButton.dataset.state = 'Compress';
            
            // Adjust sidebar styles for compressed state
            sidebar.style.width = '10vw';
            sidebar.style.margin = '0';
            sidebar.style.height = '50vh';
            avatarBox.style.display = 'none';
            name.style.fontSize = '20px';
            name.style.padding = '10px 0px';
            contactsBtn.style.display = 'flex';
            contactsItems.style.display = 'none';

        } else {
            toggleButton.innerHTML = 'Compress';
            toggleButton.dataset.state = 'Expand';
            avatarBox.style.display = 'flex';
            sidebar.style.width = '23vw';
            sidebar.style.margin = '0px 55px';
            sidebar.style.height = '100vh';
            avatarBox.style.display = 'flex';
            name.style.fontSize = ''; 
            name.style.padding = ''; 
            contactsBtn.style.display = 'none';
            contactsItems.style.display = 'flex';
            contactsItems.style.flexDirection = 'column';
        }
    });
    
    contactsBtn.addEventListener('click', function () {
        if (toggleButton.dataset.state === 'Compress' && contactsBtn.innerHTML == 'Show Contacts') {
            contactsItems.style.display = 'flex';
            contactsItems.style.flexDirection = 'column';
            contactsBtn.innerHTML = 'Hide Contacts';
            avatarBox.style.display = 'flex';
        } else{
            contactsItems.style.display = 'none';
            contactsBtn.innerHTML = 'Show Contacts';
        }
    });
});