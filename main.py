from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
import os

file_path = os.path.abspath(os.getcwd()) + r"\..\Bot_SM\database\account.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api()
db = SQLAlchemy(app)


class Order(db.Model):
    __tablename__ = 'orders'
    number_order = db.Column(db.String(20), primary_key=True, unique=True)
    user = db.Column(db.Integer)
    device_id = db.Column(db.String(20))
    order_info = db.Column(db.String(8192))


@app.route("/")
def index():
    # return render_template("order.html")
    return "hello"


@app.route("/<order_number>")
def order_number(order_number):
    return render_template("order.html")


@app.route("/api/v1/<order_number>")
def api_order_number(order_number):
    result = db.session.query(Order).filter_by(number_order=order_number).first()
    json = result.order_info
    return json



if __name__ == '__main__':
    app.run(debug=True)
