
function toggleNotif() { 
    
    let basketIcon = document.getElementById('basketIcon')
    console.log(document.cookie)
    console.log(basketIcon.classList.contains('invisible'))
    if (document.cookie === "stock"){
        basketIcon.classList.add('invisible');
    } else if (document.cookie.includes('stock')) {
        basketIcon.classList.remove('invisible') 
    } else { 
        console.log('rip')
    }
    console.log('toggled!')
    console.log(document.cookie)
    console.log(basketIcon.classList.contains('invisible'))
}



window.addEventListener('load', function() { 
    toggleNotif(); 
    console.log(window.location.pathname.split('-'))
    // final screen
    if (window.location.pathname === "/checkout") { 
        const emptyBasket = document.getElementById('clearBasket')
        emptyBasket.addEventListener('click', toggleNotif)
    } else if (window.location.pathname.split('-')[0] === '/purchase') {
        const addBasket = document.getElementById('addToBasket')
        console.log(addBasket)
        addBasket.addEventListener('click', toggleNotif)
    }
})

// link this file in every html file 
// remove the script tags from the bottom of every html file 
// add event listener for load 
// add event listener to specific pages where we want it to check
    // remove bakset -- checkout page 
    // add to basket -- purchase page
