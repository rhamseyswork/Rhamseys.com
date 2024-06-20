//Console.log Google Font
document.fonts.load("1em 'Poppins'").then(function () {
    console.log("Poppins has loaded.");
}).catch(function () {
    console.log("Poppins failed to load.");
    // Implement fallback logic here
});


//write the js so the function acess the to change on click (state)
document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('sidebar-toggle');
    var sidebar = document.querySelector('.sidebar');
    var avatarBox = sidebar.querySelector('.avatar-box'); // Selects the avatar-box inside the sidebar
    var name = sidebar.querySelector('#info-content-name');
    var contacts = sidebar.querySelector('#info_more-btn');
    var contactsItems = sidebar.querySelector('.sidebar-info-more');

    // Set initial states
    sidebar.style.width = '25%'; // Assuming this is the default width
    toggleButton.dataset.state = 'expanded'; // Custom attribute to track the state

    toggleButton.addEventListener('click', function () {
        // Toggle button content
        if (toggleButton.dataset.state === 'expanded') {
            toggleButton.innerHTML = 'Expand <ion-icon name="expand-outline"></ion-icon>';
            toggleButton.dataset.state = 'compressed';
        } else {
            toggleButton.innerHTML = 'Compress <ion-icon name="reorder-four-outline"></ion-icon>';
            toggleButton.dataset.state = 'expanded';
        }

        // Toggle sidebar width
        if (sidebar.style.width === '10vw') {
            sidebar.style.width = '23vw';
            sidebar.style.margin = ' 0px 55px'
            sidebar.style.height = '100vh';
            avatarBox.style.display = 'flex';
        } else {
            sidebar.style.width = '10vw';
            sidebar.style.margin = '0'
            sidebar.style.height = '50vh';
            avatarBox.style.display = 'none';
            name.style.fontSize = '20px';
            name.style.padding = '10px 0px';
            contacts.style.display = "flex"
            contactsItems.style.display = "none"
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('sidebar-toggle');
    var moreContacts = document.getElementById('info_more-btn');

    moreContacts.addEventListener('click', function () {


        if (toggleButton.dataset.state === 'expanded') {
            toggleButton.innerHTML = 'Expand <ion-icon name="expand-outline"></ion-icon>';
            toggleButton.dataset.state = 'compressed';

        } else {
            toggleButton.innerHTML = 'Compress <ion-icon name="reorder-four-outline"></ion-icon>';
            toggleButton.dataset.state = 'expanded';
        }
    });

});
