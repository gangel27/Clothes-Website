from flask import Flask, render_template, send_from_directory, jsonify
import json

# sizes go T/S/M/L/H


app = Flask(__name__)
app.config["SECRET_KEY"] = "aslfjivnw"
app.config["SITE_IMAGES_DEST"] = "Images"  #
app.config["SITE_ICON_DEST"] = "Images/Icons"
app.config["SITE_STOCK_IMG_DEST"] = "Images/Stock_Images"

# configure_uploads(app, photos)


@app.route("/")
@app.route("/index")
def main():
    return render_template("index.html")


@app.route("/gallery")
def products():
    return render_template("gallery.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/Images/<filename>")
def get_file(filename):
    return send_from_directory(app.config["SITE_IMAGES_DEST"], filename)


@app.route("/Images/Icons/<filename>")
def get_icon(filename):
    return send_from_directory(app.config["SITE_ICON_DEST"], filename)


@app.route("/Images/Stock_Images/<filename>")
def get_stock_img(filename):
    return send_from_directory(app.config["SITE_STOCK_IMG_DEST"], filename)


@app.route("/filter/<sex>+<size>", methods=['GET', 'POST'])
def return_filter_items(sex, size): 
    img = 'Images/Stock_Images/'
    title = 'TITTTLE'
    subtitle = 'this is an example of what a subtitle would look like. and more flabberjabber'

    with open('stock.json') as json_file: 
        data = json.load(json_file) ['stock']
    images = []
    titles = []
    subtitles = []
    for product in data: 
        if (product['size'] in size or size == ".") and (sex == "." or sex == product['sex']): 
            images.append(img + product['thumbnail'])
            titles.append(product['title'])
            subtitles.append(product['subtitle'])

    return jsonify([images, titles, subtitles])
    


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
