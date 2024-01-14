function showRides() {
    document.getElementById("register-ride").style.display = 'none';
    document.getElementById("animatedTable").style.display = 'block';
    document.getElementById("available-rides-title").style.color = 'var(--colorBright)';
    document.getElementById("register-rides-title").style.color = '';

}

function showRegister() {
    document.getElementById("register-ride").style.display = 'block';
    document.getElementById("animatedTable").style.display = 'none';
    document.getElementById("register-rides-title").style.color = 'var(--colorBright)';
    document.getElementById("available-rides-title").style.color = '';


}









//Home section
ScrollReveal().reveal('#info-box-headline', { delay: 100 });
ScrollReveal().reveal('#usefull-buttons', { delay: 300 });

//Reason section
ScrollReveal().reveal('#reason-content', { delay: 400 });
ScrollReveal().reveal('#reason-image', { delay: 100 });

//Register ride section
ScrollReveal().reveal('#register-ride-content', { delay: 100 });
ScrollReveal().reveal('#register-ride-forum input', { delay: 300, interval: 100 });
ScrollReveal().reveal('#register-ride-forum label', { delay: 300, interval: 100 });

//Request ride section
ScrollReveal().reveal('#headline-table', { delay: 100 });
ScrollReveal().reveal('#animatedTable', { delay: 400 });