// CART //
function getCartKey(productID, printingType, printColors, printPosition){
	return `${productID}|${printingType || ""}|${printColors || ""}|${printPosition || ""}`
}

var update_cart_btn = document.querySelectorAll('.update-cart');
update_cart_btn.forEach((btn) => {
	btn.addEventListener('click', function(){
		var productID = this.dataset.product;
		var action = this.dataset.action;
		console.log('productID: ', productID, 'action: ', action);
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


// Rating
var rating_star = document.querySelector('.rating');
if(rating_star){
	var rating = Number(rating_star.dataset.rating);
	var int_rating = parseInt(rating);
	var fraction = rating - int_rating;
	for(let i=1; i<=int_rating; i++){
		rating_star.innerHTML += '<i class="fas fa-star"></i>';
	}
	if(fraction >= 0.5){
		rating_star.innerHTML += '<i class="fas fa-star-half-alt"></i>';
		int_rating++;
	}
	for(let i=int_rating+1; i<=5; i++){
		rating_star.innerHTML += '<i class="far fa-star"></i>';
	}
}

// location navigation
var links = document.querySelectorAll('.category-options a');
links.forEach((link) => {
	link.href = link.href.replace('product/', '');
});

var ratingSubmitBtn = document.querySelector('.rating-submit');
if(ratingSubmitBtn){
ratingSubmitBtn.addEventListener('click', function(){
	var rating = document.querySelector('.rating-select').value;
	var user = this.dataset.user;
	var product = this.dataset.product;
	console.log('product: ', product, 'user: ', user, 'rating: ', rating);

	var url = '/rating_update/'
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({
			'productID': product,
			'user': user,
			'rating': rating
		})
	})
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		console.log('data:', data)
		location.reload();
	})
});
}



//review
var review_btn = document.querySelectorAll('.review-submit');
review_btn.forEach((submit) => {
	submit.addEventListener('click', function(){
		var productID = this.dataset.product;
		var action = this.dataset.action;

		if(action == "add"){
			var review = document.querySelector('.review-text').value;
			console.log('productID: ', productID, ' action:', action, ' review:', review);

			var url = '/update_review/'
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify({
					'productID': productID,
					'action': action,
					'review': review
				})
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				location.reload();
			})
		}
		else{
			var reviewID = this.dataset.review;
			var url = '/update_review/'
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
				},
				body: JSON.stringify({
					'productID': productID,
					'action': action,
					'reviewID': reviewID
				})
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				location.reload();
			})
		}
	});

});


var addToCartBtn = document.querySelector('.add-to-cart-btn.update-cart')
var printingTypeSelect = document.querySelector('#printing-type-select')
var printColorsSelect = document.querySelector('#print-colors-select')
var printPositionSelect = document.querySelector('#print-position-select')

if(addToCartBtn){
	if(printingTypeSelect){
		printingTypeSelect.addEventListener('change', () => {
			addToCartBtn.dataset.printing_type = printingTypeSelect.value
		})
	}
	if(printColorsSelect){
		printColorsSelect.addEventListener('change', () => {
			addToCartBtn.dataset.print_colors = printColorsSelect.value
		})
	}
	if(printPositionSelect){
		printPositionSelect.addEventListener('change', () => {
			addToCartBtn.dataset.print_position = printPositionSelect.value
		})
	}
}
