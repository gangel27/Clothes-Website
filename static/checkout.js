
async function updateBasketTable() {
    const table = document.getElementById('basket-table')
    const discountInput = document.getElementById('discountCode')
    const finalPrice = document.getElementById('finalPrice')
    const thead = table.getElementsByTagName('thead')[0]; 

    // clears table
    while( thead.children.length > 1) { 
        thead.removeChild(thead.lastChild)
    }

    let i = 1
    let total = 0 
    items = document.cookie.split('?')
    items.forEach(async (prod) =>  { 
        if (prod != "stock" && prod != "") { 
            let prodID = prod.split('-')[0]
            let amount = prod.split('-')[1]
            let size = prod.split('-')[2]

            let table_name = ""
            let table_number = amount
            let table_size = size 
            let table_price = "" 


            // function that returns product name, size, price 
            await fetch(`/data/${prodID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Assuming the response is in JSON format
            })
            .then(data => {
                // Handle the data received from the server
                table_name = data['title']
                table_price = data['price'] * amount
                total += parseFloat(table_price)     
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

            var row = table.insertRow(i); 
            var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2); 
            var cell4 = row.insertCell(3); 
            
            cell1.innerHTML = table_name
            cell2.innerHTML = table_number
            cell3.innerHTML = table_size
            cell4.innerHTML = "£" + table_price
            i++; 
            finalPrice.innerHTML = "£" + total.toString()
        } else { 
            finalPrice.innerHTML = "£" + 0
        }
    })
}

// called from purchase screen 
function updateStock() { 
    const addedMsg = document.getElementById('addedTag')
    const amount = document.getElementById('inputQuantity').value
    const size = document.getElementById('sizeSelector').value
    prodID = window.location.pathname.split('-')[1]
    addedMsg.classList.toggle('toggle-display')
    document.cookie = document.cookie +  "?" + prodID + "-" + amount.toString() + '-' + size;// stock?001-2?002-3

    //document.cookie.push(new_prod)

    // takes prod ID and number and returns size, price
}

window.addEventListener('load', function() { 
    if (document.cookie === ""){document.cookie = 'stock'}
    // final screen
    if (window.location.pathname === "/checkout") { 
        let clearBasket = document.getElementById('clearBasket')
        clearBasket.addEventListener('click', function() { 
            document.cookie = "stock"
            updateBasketTable(); 
        })
        updateBasketTable(); 
    } else { // adding product to basket screen 
        const addToBasketBtn = document.getElementById('addToBasket')
        addToBasketBtn.addEventListener('click', function(){ 
            updateStock(); 
        })
    }
})



