# -*- encoding: utf-8 -*-
##############################################################################
#    Copyright (c) 2015 - Open2bizz
#    Author: Open2bizz
#
#    Contributions:
#    Stefan Rijnhart <stefan@opener.am>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    A copy of the GNU General Public License is available at:
#    <http://www.gnu.org/licenses/gpl.html>.
#
##############################################################################
{
    'name': 'POS Container Deposit',
    'version': '1.0',
    'category': 'General',
    'description': """
This module is used to manage container deposits for products in Point of Sale.

A checkbox is added to the product form to mark products for coming with such
a deposit. When checked, a deposit product can be linked to the product. This
product will be added in the point of sale automatically. If the product
quanity is modified, the deposit line is kept in sync and vice versa.
""",
    'author': "Open2bizz",
    'website': "http://www.open2bizz.nl",
    'depends': ['point_of_sale', ],
    'data': [
        'views/pos_deposit.xml',
        'product/product_view.xml'
    ],
    'qweb': ['static/src/xml/pos.xml'],
    'installable': True,
}
