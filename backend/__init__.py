from __future__ import absolute_import

# import this first to make sure we call matplotlib.use() right away
from .mpl_server import MatplotlibServer
from .handlers import all_routes
from .handlers.base import BaseHandler