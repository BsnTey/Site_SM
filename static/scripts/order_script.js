const number = document.getElementById('number_order');
const createdDate = document.getElementById('create-date');
const address = document.getElementById('address-item');
const button_route_id = document.getElementById('button-route-id');
const about_address_info_id = document.getElementById('about-address-info-id');
const operating_mode_id = document.getElementById('operating-mode-id');
const button_check = document.getElementById('check-button');
const trek_number_block = document.getElementById('trek-number-block');
const trek_number_url = document.getElementById('trek-number-url');
const trek_number_link = document.getElementById('trek-number-link');
const date_delivery_type = document.getElementById('date-delivery-type');
const receiving_time_slot = document.getElementById('receiving-time-slot');
const button_check_text = document.getElementById('check-button-text');
const title_type_order = document.getElementById('title-type-order');
const payment_method_text = document.getElementById('payment-method-text');
const fio_receiver = document.getElementById('fio-receiver');
const email_receiver = document.getElementById('email-receiver');
const number_receiver = document.getElementById('number-receiver');
const image_item = document.getElementById('image-item');
const name_item = document.getElementById('name-item');
const receiving_date_from = document.getElementById('receiving-date-from');
const receiving_date_to = document.getElementById('receiving-date-to');
const is_payed = document.getElementById('is-payed');
const quantity_items = document.getElementById('quantity-items');
const quantity_items_name = document.getElementById('quantity-items-name');
const price_items_id = document.getElementById('price-items-id');
const catalog_discount_block = document.getElementById('catalog-discount-block');
const catalog_discount = document.getElementById('catalog-discount');
const promocode_discount_block = document.getElementById('promocode-discount-block');
const promocode_discount = document.getElementById('promocode-discount');
const total_bonuses_used_block = document.getElementById('total-bonuses-used-block');
const total_bonuses_used = document.getElementById('total-bonuses-used');
const total_cost = document.getElementById('total-cost');
const quantity_items_order = document.getElementById('quantity-items-order');
const quantity_items_name_order = document.getElementById('quantity-items-name-order');
const electronic_receipt = document.getElementById('electronic-receipt');
const cancelled_order = document.getElementById('cancelled-order');




const months = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'
}

const payed_list = {
    true: "Оплачен",
    false: "Не оплачен"
}

const num_items = {
    1 : "товар",
    2 : "товара",
    3 : "товара",
    4 : "товара",
    5 : "товаров"
}

function digitSeparator(digit) {
    return digit.toString().replace(/(\d{3})+$/,
        (g, g1, i) => (i ? " " : "") + g.match(/.{3}/g).join(" "));
}

let xhr = new XMLHttpRequest();
let url = "/api/v1" + document.location.pathname;
xhr.open("GET", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        number.innerText = json.data.order.number;
        let date = new Date(json.data.order.createdDate);
        let date_month = date.getDate();
        let monthIndex = date.getMonth();
        let month = months[monthIndex];
        let hour = date.getHours();
        let minutes = date.getMinutes();
        if (minutes === 0) {
            minutes = '0' + minutes;
        }
        createdDate.innerText = date_month + ' ' + month + ', ' + hour + ':' + minutes;

        receiving_date_from_get = json.data.order.deliveryInfo.receivingDateFrom;
        let date_from = new Date(receiving_date_from_get);
        let date_from_day = date_from.getDate();
        let date_from_month = date_from.getMonth();
        let dateFromMonth = months[date_from.getMonth()];

        let date_to;
        let date_to_day;
        let date_to_month;
        let dateToMonth;
        receiving_date_to_get = json.data.order.deliveryInfo.receivingDateTo;
        date_to = new Date(receiving_date_to_get);
        date_to_day = date_to.getDate();
        date_to_month = date_to.getMonth();
        dateToMonth = months[date_to.getMonth()];


        let type_delivery = json.data.order.deliveryInfo.type.value;
        if (type_delivery === "PICKUP") {
            trek_number_block.style.display = "none";
            address.innerText = json.data.order.deliveryInfo.intPickup.shopAddress;
            date_delivery_type.innerText = "Дата доставки"
            receiving_date_from.innerText = date_from_day + ' ' + dateFromMonth;
            if (receiving_date_to_get) {
                receiving_date_to.innerText = '. Срок хранения до ' + date_to_day + ' ' + dateToMonth
            }

        } else if (type_delivery === "DELIVERY") {
            address.innerText = json.data.order.deliveryInfo.delivery.address;
            button_route_id.style.display = "none";
            operating_mode_id.style.display = "none";
            about_address_info_id.style.maxWidth = "100%";
            let url_link_full = json.data.order.deliveryInfo.delivery.trackNumbers[0]
            let url_link = url_link_full.split('?');
            trek_number_url.innerText = url_link[1];
            trek_number_link.href = url_link_full;
            date_delivery_type.innerText = "Дата и время доставки"
            if (date_from_day < 10) {
                date_from_day = '0' + date_from_day;
            }
            if (date_to_day < 10) {
                date_to_day = '0' + date_to_day;
            }

            date_from_month += 1;
            date_to_month += 1;
            if (date_from_month < 10) {
                date_from_month = '0' + date_from_month;
            }
            if (date_to_month < 10) {
                date_to_month = '0' + date_to_month;
            }
            receiving_date_from.innerText = date_from_day + '.' + date_from_month + ' - ' + date_to_day + '.' + date_to_month;
            receiving_time_slot.innerText = ', ' + json.data.order.deliveryInfo.receivingTimeSlot;
        }

        button_check.style.backgroundColor = json.data.order.status.backgroundColor;
        button_check.style.color = json.data.order.status.textColor;
        button_check_text.innerText = json.data.order.status.statusText;
        title_type_order.innerText = json.data.order.deliveryInfo.type.title;
        payment_method_text.innerText = json.data.order.payment.paymentMethod.name;
        fio_receiver.innerText = json.data.order.deliveryInfo.receiver.fio;
        email_receiver.innerText = json.data.order.deliveryInfo.receiver.email;
        var number_receiver_get = json.data.order.deliveryInfo.receiver.phone.nationalNumber;
        number_receiver.innerText = String(number_receiver_get).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

        let payed = json.data.order.payment.isPayed;
        if (payed != null) {
            is_payed.innerText = payed_list[payed];
            if (payed) {
                is_payed.style.color = "rgb(78, 181, 41)"
            }
        }
        let items_length = (json.data.order.items).length;
        quantity_items.innerText = String(items_length);
        quantity_items_order.innerText = String(items_length);
        if (items_length < 5) {
            quantity_items_name.innerText = num_items[items_length];
            quantity_items_name_order.innerText = num_items[items_length];
        } else {
            quantity_items_name.innerText = num_items[5];
            quantity_items_name_order.innerText = num_items[5];
        }
        let total_catalog_cost = json.data.order.totals.totalCatalogCost.value / 100;
        price_items_id.innerText = digitSeparator(total_catalog_cost);

        let catalog_discount_price = json.data.order.totals.catalogDiscount.value;
        if (catalog_discount_price) {
            catalog_discount_price /= 100;
            catalog_discount.innerText = digitSeparator(catalog_discount_price);
        } else {
            catalog_discount_block.style.display = "none";
        }

        let promocode_discount_price = json.data.order.totals.promocodeDiscount.value;
        if (promocode_discount_price) {
            promocode_discount_price /= 100;
            promocode_discount.innerText = digitSeparator(promocode_discount_price);
        } else {
            promocode_discount_block.style.display = "none";
        }

        let total_bonuses_used_price = json.data.order.totals.totalBonusesUsed.value;
        if (total_bonuses_used_price) {
            total_bonuses_used_price /= 100;
            total_bonuses_used.innerText = digitSeparator(total_bonuses_used_price);
        } else {
            total_bonuses_used_block.style.display = "none";
        }

        let total_cost_price = json.data.order.totals.totalCost.value / 100;
        total_cost.innerText = digitSeparator(total_cost_price);

        let status_order = json.data.order.status.status;

        if (status_order !== "issued" && status_order !== "delivered") {
            electronic_receipt.style.display = "none";
        }
        if (status_order === "delivered" || status_order === "cancelled" || status_order === "issued") {
            cancelled_order.style.display = "none";
        }

        for (let i = 0; i < items_length; i++) {
            let about_order_section = document.querySelector('.about-order-section');
            let order_section = document.createElement('li');
            order_section.classList.add('order-section');
            about_order_section.append(order_section);
            let image_item = document.createElement('img');
            image_item.classList.add('image_item');
            order_section.append(image_item);
            let about_order_info = document.createElement('div');
            about_order_info.classList.add('about-order-info');
            image_item.src = json.data.order.items[i].image;
            order_section.append(about_order_info);

            let wrapper_order_info = document.createElement('div');
            wrapper_order_info.classList.add('wrapper-order-info');
            about_order_info.append(wrapper_order_info);
            let nameItemP = document.createElement('p');
            nameItemP.classList.add('text12-black');
            nameItemP.innerText = json.data.order.items[i].name;
            wrapper_order_info.append(nameItemP);

            let ulParamOrderUl = document.createElement('ul');
            ulParamOrderUl.classList.add('param-order');
            ulParamOrderUl.classList.add('text12-grey');
            wrapper_order_info.append(ulParamOrderUl);

            let paramOrderLis = json.data.order.items[i].params;
            for (let j = 0; j < paramOrderLis.length; j++) {
                let paramOrderLi = document.createElement('li');
                let paramOrderLiName = json.data.order.items[i].params[j].name;
                let paramOrderLiValue = json.data.order.items[i].params[j].value;
                paramOrderLi.innerText = paramOrderLiName + ': ' + paramOrderLiValue;
                ulParamOrderUl.append(paramOrderLi);
            }

            let about_order_info_price = document.createElement('div');
            about_order_info_price.classList.add('about-order-info-price');
            about_order_info.append(about_order_info_price);

            let priceItem = document.createElement('p');
            priceItem.classList.add('price-item')
            priceItem.classList.add('text14-black-bold')
            priceItem.innerText = digitSeparator(json.data.order.items[i].totalPrice.value / 100) + ' ₽';
            about_order_info_price.append(priceItem);

            let priceItemDiscount  = document.createElement('p');
            priceItemDiscount.classList.add('price-item-discount')
            priceItemDiscount.classList.add('text12-grey')
            priceItemDiscount.innerText = digitSeparator(json.data.order.items[i].priceWoDiscount.value / 100) + ' ₽';
            about_order_info_price.append(priceItemDiscount);

            let itemAmount  = document.createElement('p');
            itemAmount.classList.add('count-item')
            itemAmount.classList.add('text12-grey')
            itemAmount.innerText = json.data.order.items[i].amount + ' шт.';
            about_order_info_price.append(itemAmount);

        }








    }
};
xhr.send();