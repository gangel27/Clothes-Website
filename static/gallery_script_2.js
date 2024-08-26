const gallery_stock = document.getElementById("gallery_display")


function displayGallery(ids, titles, subtitles, images, prices, sizes) {
    let no_results = ids.length; 

    for (let i =0; i < no_results; i++) { 
        let card = gallery_stock.children[i].children[0]

        let card_image = card.getElementsByTagName("img")[0]
        let card_caption = card.getElementsByTagName("div")[0]
        let card_title = card_caption.getElementsByTagName("h5")[0]
        let card_subtitle = card_caption.getElementsByTagName("p")[0]
        let card_submit = card.getElementsByTagName("button")[0]
        let card_price = card_caption.getElementsByTagName("small")[0]

        card_image.src = images[i];
        card_title.innerHTML = titles[i]; 
        card_subtitle.innerHTML = subtitles[i]; 
        card_price.innerHTML = '£' + prices[i];

        card_submit.onclick = function() {
            window.location.href = `/purchase-${ids[i]}`;
        }

        card.addEventListener('click', function() { 
            window.location.href = `/purchase-${ids[i]}`;
        })


    }
}

async function getStockData() { 
    ids = []
    images =[]
    titles = []
    prices = []
    subtitles = []
    sizes = []

    await fetch(`/alldata`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Assuming the response is in JSON format
        })
        .then(data => {
            // Handle the data received from the server
    
            images = data[0]
            titles = data[1]
            subtitles = data[2]
            ids = data[3]
            prices = data[4]
            sizes = data[5]
            displayGallery(ids, titles, subtitles, images, prices, sizes)

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}




window.addEventListener('load', getStockData())