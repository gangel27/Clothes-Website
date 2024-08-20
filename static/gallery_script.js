let filters = document.getElementById("filters")
let gallery_stock = document.getElementById("gallery_display")


// this will later be incorperated with the back end 
let no_results = 4; 
let white_hoodie_img_file = 'Images/Stock_Images/Hoodie.png'
let title_text = "White Hoody"
let subtitle_text = "This is a beautiful white hoodie for men. X, Xl, M, S"

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

        card_image.src = white_hoodie_img_file;
        card_title.innerHTML = title_text; 
        card_subtitle.innerHTML = subtitle_text; 
        card_submit.onclick = function() {
            console.log(i)
            console.log(card_title.innerHTML);
        }
        console.log(card_caption)
    }
}
