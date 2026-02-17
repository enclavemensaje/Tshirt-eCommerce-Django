var designSize = document.querySelectorAll(".design-size-selects h4")
var printingType = document.querySelectorAll(".printing-type-selects h4")
var printColors = document.querySelectorAll(".print-colors-selects h4")
var printPosition = document.querySelectorAll(".print-position-selects h4")
var tshirtSize = document.querySelectorAll(".upload .selects-2 h4")
var tshirtColor = document.querySelectorAll(".tshirt-color-selects .color")
var tshirtData = document.querySelector(".tshirt-data")
var tshirtDesgin = document.querySelector(".tshirt img")
var tshirt = document.querySelector(".tshirt")
var quentity = document.querySelector(".quentity-input")
var quentityPlus = document.querySelector(".quentity-section #plus")
var quentityMinus = document.querySelector(".quentity-section #minus")


designSize[1].style.background = "black"
designSize[1].style.color = "white"
tshirtSize[3].style.background = "black"
tshirtSize[3].style.color = "white"
tshirtColor[0].style.border = "1px solid #111"
printingType[0].style.background = "black"
printingType[0].style.color = "white"
printColors[0].style.background = "black"
printColors[0].style.color = "white"
printPosition[0].style.background = "black"
printPosition[0].style.color = "white"

var quentityValue = Number.parseInt(quentity.value)

quentityPlus.addEventListener('click', () => {
	quentity.value = ++quentityValue
	tshirtData.dataset.quentity = quentity.value
})
quentityMinus.addEventListener('click', () => {
	if(quentityValue > 1){
		quentity.value = --quentityValue
		tshirtData.dataset.quentity = quentity.value
	}
})

designSize.forEach((item, i) => {
	item.addEventListener("click", () => {
		designSize.forEach((item, i) => {
			item.style.background = "#f4f4f4"
			item.style.color = "gray"
		})
		item.style.background = "black"
		item.style.color = "white"
		tshirtData.dataset.design_size = item.dataset.size
		tshirtDesgin.className = `design-` + item.dataset.size
	})
})

tshirtSize.forEach((item, i) => {
	item.addEventListener("click", () => {
		tshirtSize.forEach((item, i) => {
			item.style.background = "#f4f4f4"
			item.style.color = "gray"
		})
		item.style.background = "black"
		item.style.color = "white"
		tshirtData.dataset.tshirt_size = item.dataset.size
	})
})

tshirtColor.forEach((item, i) => {
	item.addEventListener("click", () => {
		tshirt.style.backgroundColor = item.dataset.color
		tshirtData.dataset.tshirt_color = item.dataset.color
	})
})


printingType.forEach((item, i) => {
	item.addEventListener("click", () => {
		printingType.forEach((item, i) => {
			item.style.background = "#f4f4f4"
			item.style.color = "gray"
		})
		item.style.background = "black"
		item.style.color = "white"
		tshirtData.dataset.printing_type = item.dataset.printing_type
	})
})

printColors.forEach((item, i) => {
	item.addEventListener("click", () => {
		printColors.forEach((item, i) => {
			item.style.background = "#f4f4f4"
			item.style.color = "gray"
		})
		item.style.background = "black"
		item.style.color = "white"
		tshirtData.dataset.print_colors = item.dataset.print_colors
	})
})


printPosition.forEach((item, i) => {
	item.addEventListener("click", () => {
		printPosition.forEach((item, i) => {
			item.style.background = "#f4f4f4"
			item.style.color = "gray"
		})
		item.style.background = "black"
		item.style.color = "white"
		tshirtData.dataset.print_position = item.dataset.print_position
	})
})

var designInput = document.querySelector(".design-input")
designInput.addEventListener("input", () => {
	const reader = new FileReader()
	reader.readAsDataURL(designInput.files[0])
	reader.onload = () => {
		tshirtDesgin.src = reader.result
	}
})

var orderForm = document.querySelector(".custom-order-form")
orderForm.addEventListener('submit', (e) => {
	e.preventDefault()
	var formData = new FormData(orderForm)
	formData.append('tshirt_size', tshirtData.dataset.tshirt_size)
	formData.append('design_size', tshirtData.dataset.design_size)
	formData.append('color', tshirtData.dataset.tshirt_color)
	formData.append('quentity', tshirtData.dataset.quentity)
	formData.append('printing_type', tshirtData.dataset.printing_type)
	formData.append('print_colors', tshirtData.dataset.print_colors)
	formData.append('print_position', tshirtData.dataset.print_position)
	console.log(Array.from(formData))

	var url = '/custom/'
	fetch(url, {
		method: 'POST',
		body: formData
	})
	.then((res) => {
		window.location.assign('/cart/none')
	})
})
