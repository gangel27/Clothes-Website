const filters = document.getElementById("filters")
const gallery_stock = document.getElementById("gallery_display")



// this will later be incorperated with the back end 
let white_hoodie_img_file = 'Images/Stock_Images/Hoodie_black.png'
let title_text = "White Hoody"
let subtitle_text = "This is a beautiful white hoodie for men. X, Xl, M, S"
// we just need it to return a list of everything checked

let images = [white_hoodie_img_file, white_hoodie_img_file, white_hoodie_img_file, white_hoodie_img_file];
let titles = [title_text, title_text, title_text, title_text]; 
let subtitle_texts = [subtitle_text, subtitle_text, subtitle_text, subtitle_text]


let no_results = images.length;

function display_search_results(images, titles, subtitles) {
    let no_results = images.length; 

    for (let i=0; i < gallery_stock.children.length; i++){
        let card = gallery_stock.children[i].children[0]
        if (i >= no_results){
            gallery_stock.children[i].style.display = 'none'
        } else { 
            let card_image = card.getElementsByTagName("img")[0]
            let card_caption = card.getElementsByTagName("div")[0]
            let card_title = card_caption.getElementsByTagName("h5")[0]
            let card_subtitle = card_caption.getElementsByTagName("p")[0]
            let card_submit = card_caption.getElementsByTagName("button")[0]
    
            card_image.src = images[i];
            card_title.innerHTML = titles[i]; 
            card_subtitle.innerHTML = subtitles[i]; 
            card_submit.onclick = function() {
                console.log(i)
                // buying functino to go here
            }
        }
    }
    
}

async function query_search_results(sex, size) { 
    console.log(sex )
    console.log(size)
    let images = []
    let titles = []
    let subtitles = []
    
    await fetch(`/filter/${sex}+${size}`)
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
            display_search_results(images, titles, subtitles)
            
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    
}

function get_filter_data() { 
    let sex = '.'
    let size = '.'
    let isMan = document.getElementById('ManCheck').checked;
    let isWoman = document.getElementById('WomanCheck').checked;
    let isXS = document.getElementById('XSCheck').checked;
    let isS = document.getElementById('SCheck').checked;
    let isM = document.getElementById('MCheck').checked;
    let isL = document.getElementById('LCheck').checked;
    let isXL = document.getElementById('XLCheck').checked;

    if (isMan && !isWoman) { 
        sex = 'M'
    } else if (isWoman && !isMan) { 
        sex = 'F'
    }

    if (!isXS || !isS || !isM || !isM || !isL || !isXL){
        size = ''
        if (isXS) { 
            size += 'XS'
        }
        if (isS) { 
            size += 'S'
        }
        if (isM) { 
            size += 'M'
        }
        if (isL) { 
            size += 'L'
        }
        if (isXL) { 
            size += 'XL'
        }
    }

    console.log(sex)
    console.log(size)
    return [sex, size]
}

display_search_results(images, titles, subtitle_texts)
query_search_results()
filters.addEventListener('change', function() { 
    let data = get_filter_data()
    data = query_search_results(data[0], data[1])
})