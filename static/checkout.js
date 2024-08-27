
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

async function sortDiscountCode() { 
    const discountInput = document.getElementById('discountCode')
    const validDiscount = document.getElementById('validDiscount')
    const invalidDiscount = document.getElementById('invalidDiscount')
    const discountSubmit = document.getElementById('discountSubmit')
    const Price = document.getElementById('finalPrice')
    initial = Price.innerHTML
    initial_val = initial.split('£')[1]

    // these will come from backend fetch 
    let isValid = false; 
    let discountMult = 0.8; 
    if (discountInput.value === "TEST"){isValid = true; }

    if (isValid) { 
        final = parseFloat(initial_val) * discountMult
        Price.innerHTML = initial.strike() + '  £' +final.toString() 
        discountSubmit.disabled = true; 
        discountInput.disabled = true
        if (validDiscount.classList.contains('toggle-display')){ // if invisible
            validDiscount.classList.remove('toggle-display') // make visible
        }
        if (!invalidDiscount.classList.contains('toggle-display')){ // if visible 
            invalidDiscount.classList.add('toggle-display') // make invisible
        }
    } else { 
        if (invalidDiscount.classList.contains('toggle-display')){ // if invisible
            invalidDiscount.classList.remove('toggle-display') // make visible
        }
        if (!validDiscount.classList.contains('toggle-display')){ // if visible 
            validDiscount.classList.add('toggle-display') // make invisible
        }
    }
}

function handleFormSubmit() {
    const submitForm = document.getElementById('submit-form')
    const formDivs = submitForm.getElementsByClassName("form-field")
    let fname = ''
    let lname = '' 
    let address1 = '' 
    let address2 = '' 
    let country = '' 
    let postcode = '' 

    for (let i = 0; i < formDivs.length; i++){ 
        div = formDivs[i]
        error = div.getElementsByClassName('error-msg')[0]
        input = div.getElementsByTagName('input')[0].value;
        
        // checks if each field is empty + not required
        if (input.length === 0 && !div.classList.contains('not-necessary')) { 
            error.classList.remove('toggle-display')
        } else { 
            // form is valid if makes it here 
            if (!error.classList.contains('toggle-display')){
                error.classList.add('toggle-display')
            }

            fname = document.getElementById('firstName').value; 
            lname = document.getElementById('lastName').value; 
            address1 = document.getElementById('address1').value;
            address2 = document.getElementById('address2').value; 
            email = document.getElementById('email').value;
            phone = document.getElementById('phone').value;  
            country = document.getElementById('country').value;
            postcode = document.getElementById('postcode').value;

            console.log('submitted')
        }
    }
    

    // check form validity 
}
// called from purchase screen 
function updateStock() { 
    const addedMsg = document.getElementById('addedTag')
    const amount = document.getElementById('inputQuantity').value
    const size = document.getElementById('sizeSelector').value
    prodID = window.location.pathname.split('-')[1]
    // addedMsg.style.animation = `add-basket 3s ease 0s 1s forwards intial intial`
    addedMsg.style.animation = `add-basket 3s ease forwards 1`;
    document.cookie = document.cookie +  "?" + prodID + "-" + amount.toString() + '-' + size;// stock?001-2?002-3

    //document.cookie.push(new_prod)

    // takes prod ID and number and returns size, price
}

window.addEventListener('load', function() { 
    if (document.cookie === ""){document.cookie = 'stock'}
    // final screen
    if (window.location.pathname === "/checkout") { 
        const clearBasket = document.getElementById('clearBasket')
        const discountSubmit = document.getElementById('discountSubmit')
        const formSubmit = document.getElementById('submitAddress')
        
        clearBasket.addEventListener('click', function() { 
            document.cookie = "stock"
            updateBasketTable(); 
            sortDiscountCode(); 
        })
        discountSubmit.addEventListener('click', function(){ 
            sortDiscountCode(); 

        })
        formSubmit.addEventListener('click', function() { 
            handleFormSubmit(); 
        })

        updateBasketTable(); 
    } else { // adding product to basket screen 
        const addToBasketBtn = document.getElementById('addToBasket')
        addToBasketBtn.addEventListener('click', function(){ 
            updateStock(); 
            
        })
    }
})



