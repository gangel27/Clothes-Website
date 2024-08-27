from flask import Flask, render_template, send_from_directory, jsonify
import json
from flask import request
from email.message import EmailMessage
import ssl
import smtplib

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


@app.route("/checkout")
def checkount():
    return render_template("checkout.html")


@app.route("/FAQ")
def FAQ():
    return render_template("FAQ.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/purchase-<ProdID>")
def purchase_item(ProdID):
    title = ""
    price = ""
    subtitle = ""
    size = ""

    img = "Images/Stock_Images/"
    with open("stock.json") as json_file:
        data = json.load(json_file)["stock"]

    for product in data:
        if product["id"] == ProdID:
            title = product["title"]
            price = product["price"]
            # size = product["size"]
            image_ = img + product["thumbnail"]
            subtitle = product["description"]

    print(image_)

    return render_template(
        "purchase.html",
        product_title=title,
        product_price=price,
        product_size=size,
        product_image=image_,
        product_subtitle=subtitle,
    )


@app.route("/Images/<filename>")
def get_file(filename):
    return send_from_directory(app.config["SITE_IMAGES_DEST"], filename)


@app.route("/Images/Icons/<filename>")
def get_icon(filename):
    return send_from_directory(app.config["SITE_ICON_DEST"], filename)


@app.route("/Images/Stock_Images/<filename>")
def get_stock_img(filename):
    return send_from_directory(app.config["SITE_STOCK_IMG_DEST"], filename)


# @app.route("/filter/<sex>+<size>", methods=["GET", "POST"])
# def return_filter_items(sex, size):
#     img = "Images/Stock_Images/"

#     with open("stock.json") as json_file:
#         data = json.load(json_file)["stock"]
#     images = []
#     titles = []
#     subtitles = []
#     ids = []
#     prices = []

#     if sex != "-" and size != "-":
#         print("yes")
#         for product in data:
#             if (product["size"] in size or size == ".") and (
#                 size == "." or sex == product["sex"]
#             ):
#                 images.append(img + product["thumbnail"])
#                 titles.append(product["title"])
#                 subtitles.append(product["subtitle"])
#                 ids.append(product["id"])
#                 prices.append(product['price'])
#     print(sex, size)
#     print(images)

#     return jsonify([images, titles, subtitles, ids, prices])


@app.route("/alldata")
def returnall():
    img = "Images/Stock_Images/"
    images = []
    titles = []
    subtitles = []
    ids = []
    prices = []
    sizes = []  # 2d array

    with open("stock.json") as json_file:
        data = json.load(json_file)["stock"]

    for prod in data:
        images.append(img + prod["thumbnail"])
        titles.append(prod["title"])
        subtitles.append(prod["subtitle"])
        ids.append(prod["id"])
        prices.append(prod["price"])
        sizes.append(
            {
                "small": prod["small"],
                "medium": prod["medium"],
                "large": prod["large"],
                "xlarge": prod["xlarge"],
            }
        )

    return jsonify([images, titles, subtitles, ids, prices, sizes])


@app.route("/data/<ProdID>", methods=["GET", "POST"])
def return_data(ProdID):
    # img = "Images/Stock_Images/"

    with open("stock.json") as json_file:
        data = json.load(json_file)["stock"]

    for product in data:
        if product["id"] == ProdID:
            return product
    return "<h3>Not a valid product</h3>"


@app.route("/return-form-data", methods=["POST"])
def return_form_data():
    data = request.get_json()
    company_email = "georgeangeluk@gmail.com"
    email = "crownedapparel.business@gmail.com"
    password = "oxeu jiik jwgr ofml"
    laptop_passowrd = "obdw mqtx rmuu ybpv"
    laptop_passowrd_2 = "ccmm jcnp jzwh fftu"

    message = f"""
Dear {data['fname']}, 

Thank you for buying our product!! We expect it will be with you in 2 weeks, however if you would like an update just drop us an email at {company_email}.

We hope you are satisfied with your purchase.

Best wishes from the team at Crowned. 
"""

    subject = "Crowned Purchase"

    em = EmailMessage()
    em["From"] = email
    em["To"] = data["email"]
    em["Subject"] = subject
    em.set_content(message)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(email, laptop_passowrd_2)
        smtp.sendmail(email, data["email"], em.as_string())

    return "200"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
