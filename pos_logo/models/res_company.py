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
from openerp import models, fields


class Company(models.Model):
    _inherit = 'res.company'

    pos_logo = fields.Binary(
        string='POS Receipt Logo',
        help=('Add an alternate logo to print on receipts printed from the '
              'POS printer. The optimum size of the image is 300px by 300px.'))
