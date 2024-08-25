console.log('this is the purchase screen')

window.addEventListener('load', function() { 
    const prodSize = document.getElementById('productSize')
    prodSize.innerHTML = size_convert(prodSize.innerHTML)
})

function size_convert(size) { 
    val = '' 
    switch (size) {
        case "T":
            val = 'Extra Small'
            break;
        case "S":
            val = 'Small'
            break;
        case "M":
            val = 'Medium'
            break;
        case "L":
            val = 'Large'
            break;
        case "H":
            val = 'Extra Large'
            break;    
        default:
            break;
    }
    return val 
}

