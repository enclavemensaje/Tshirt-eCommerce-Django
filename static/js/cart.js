function getCartKey(productID, printingType, printColors, printPosition){
	return `${productID}|${printingType || ""}|${printColors || ""}|${printPosition || ""}`
}

var update_btn = document.querySelectorAll('.update-item');
var totalItem = document.querySelector('.total-item');

if(totalItem.innerHTML == 0){
	document.cookie ='cart=' + JSON.stringify({}) + ";domain=;path=/";
}

update_btn.forEach((btn) => {
	btn.addEventListener('click', function(){
		var productID = this.dataset.product;
		var action = this.dataset.action;

		console.log('productID: ', productID, 'action: ', action);
		console.log(user);
		addCookieItem(productID, action, this.dataset.printing_type, this.dataset.print_colors, this.dataset.print_position);
	});
});


function addCookieItem(productID, action, printingType, printColors, printPosition){
	console.log("Cookie..");
	var cartKey = getCartKey(productID, printingType, printColors, printPosition);
	if(action == "add"){
		if(cart[cartKey] == undefined){
			cart[cartKey] = {'quentity':1};
		}
		else{
			cart[cartKey]['quentity'] += 1;
		}
	}
	else if(action == 'remove'){
		if(cart[cartKey] == undefined) return;
		cart[cartKey]['quentity'] -= 1;
		if(cart[cartKey]['quentity'] <= 0){
			delete cart[cartKey];
		}
	}
	console.log('Cart Created!', cart)
	document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/";
	location.reload();
}

function update_user_item(productID, action){
	console.log("User is authenticated");

	var url = '/update_item/';

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({
			'productID': productID,
			'action': action
		})
	})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log('data: ', data);
		location.reload();
	})
}
