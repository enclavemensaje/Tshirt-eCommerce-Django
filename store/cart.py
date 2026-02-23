import json
from .models import Product, PrintPricing

def get_variant_extra_price(printing_type=None, print_colors=None, print_position=None):
    selected = {
        'printing_type': printing_type,
        'print_colors': print_colors,
        'print_position': print_position,
    }
    extra_price = 0
    for variant_type, option_value in selected.items():
        if not option_value:
            continue
        pricing = PrintPricing.objects.filter(
            variant_type=variant_type,
            option_value=option_value,
            is_active=True
        ).first()
        if pricing:
            extra_price += pricing.extra_price
    return extra_price


def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {}

    items = []
    order = {'get_cart_total': 0, 'get_cart_total_item': 0}

    for key in cart:
        try:
            if '|' in key:
                product_id, printing_type, print_colors, print_position = (key.split('|') + ['', '', '', ''])[:4]
            else:
                product_id, printing_type, print_colors, print_position = key, '', '', ''

            product = Product.objects.get(id=product_id)
            quentity = cart[key]['quentity']
            extra_price = get_variant_extra_price(printing_type, print_colors, print_position)
            unit_price = product.price + extra_price
            total = unit_price * quentity

            order['get_cart_total_item'] += quentity
            order['get_cart_total'] += total

            item = {
                'cart_key': key,
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image
                },
                'quentity': quentity,
                'printing_type': printing_type,
                'print_colors': print_colors,
                'print_position': print_position,
                'unit_price': unit_price,
                'get_total': total
            }
            items.append(item)
        except:
            pass
    return {'items': items, 'order': order}

def cartData(request):
    cookieData = cookieCart(request)
    order = cookieData['order']
    items = cookieData['items']
    return {'items': items, 'order': order}
