# -*- coding: utf-8 -*-
##############################################################################
#
#     Copyright (C) 2015 Opener B.V (<https://opener.am>)
#
#     License: AGPL V3
#
#     You should have received a copy of the
#     GNU Affero General Public License
#     along with inactive_session_timeout.
#     If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    'name': 'Show an alternate logo on the POS printer\'s receipts',
    'author': 'Opener B.V.',
    'website': "https://opener.am",
    'category': 'Point of Sale',
    'version': '8.0.1.0.0',
    'license': 'AGPL-3',
    'depends': ['point_of_sale'],
    'data': [
        'views/res_company.xml',
    ],
    'qweb': [
        'static/src/xml/receipt.xml',
    ],
}
