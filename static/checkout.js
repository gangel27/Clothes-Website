basket = [ 
    { 
        "Product": "asdf", 
        "Number": "2",
        "Size": "F",
        "Price": "33"
    }
]
document.cookie = ''

function updateBasketTable() {
    const table = document.getElementById('basket-table')
    const discountInput = document.getElementById('discountCode')
    const finalPrice = document.getElementById('finalPrice')
    let i = 1

    basket.forEach((prod) => { 
        var row = table.insertRow(i); 
        var cell1 = row.insertCell(0); 
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); 
        var cell4 = row.insertCell(3); 
        
        cell1.innerHTML = prod['Product']
        cell2.innerHTML = prod['Number']
        cell3.innerHTML = prod['Size']
        cell4.innerHTML = prod['Price']
        i++; 
    })
}

// called from purchase screen 
function updateStock() { 
    const addedMsg = document.getElementById('addedTag')
    const amount = document.getElementById('inputQuantity').value
    prodId = window.location.pathname.split('-')[1]
    addedMsg.classList.toggle('toggle-display')

    let new_prod = { 
        "Product": "Green", 
        "Number": "22",
        "Size": "T",
        "Price": "3"
    }
    //document.cookie.push(new_prod)

    // takes prod ID and number and returns size, price
}

if (window.location.pathname === "/checkout") { 
    console.log(document.cookie)
    updateBasketTable(); 
} else { 
    const addToBasketBtn = document.getElementById('addToBasket')
    addToBasketBtn.addEventListener('click', function(){ 
        updateStock(); 
    })
}


