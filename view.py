import web
import random

render = web.template.render('templates/', cache=False, globals={})
render._keywords['globals']['render'] = render

def data(n):
    d = []
    for i in xrange(n):
        d.append(random.uniform(2,50))
    return d
