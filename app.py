from flask import Flask, render_template, send_from_directory

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


if __name__ == "__main__":
    app.run()
