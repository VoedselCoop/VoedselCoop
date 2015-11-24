# -*- encoding: utf-8 -*-
##############################################################################
#    Copyright (c) 2015 - Open2bizz
#    Author: Open2bizz
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
    'name': 'POS Deposit',
    'version': '1.0',
    'category': 'General',
    'description': """
This module is used to manage deposit for products in Point of Sale.
""",
    'author': "Open2bizz",
    'website': "http://www.open2bizz.nl",
    'depends': ['web', 'point_of_sale', 'base'],
    'data': [
        'views/pos_deposit.xml',
        'product/product_view.xml'
    ],
    'demo': [],
    'test': [],
    'qweb': ['static/src/xml/pos.xml'],
    'installable': True,
    'auto_install': False,
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
