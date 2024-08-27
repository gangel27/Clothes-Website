
function toggleNotif() { 
    
    let basketIcon = document.getElementById('basketIcon')

    if (document.cookie === "stock"){
        basketIcon.classList.add('invisible');
    } else if (document.cookie.includes('stock')) {
        basketIcon.classList.remove('invisible') 
    } else { 
        console.log('rip')
    }

}



window.addEventListener('load', function() { 
    toggleNotif(); 
    // final screen
    if (window.location.pathname === "/checkout") { 
        const emptyBasket = document.getElementById('clearBasket')
        emptyBasket.addEventListener('click', toggleNotif)
    } else if (window.location.pathname.split('-')[0] === '/purchase') {
        const addBasket = document.getElementById('addToBasket')

        addBasket.addEventListener('click', toggleNotif)
    }
})

// link this file in every html file 
// remove the script tags from the bottom of every html file 
// add event listener for load 
// add event listener to specific pages where we want it to check
    // remove bakset -- checkout page 
    // add to basket -- purchase page
