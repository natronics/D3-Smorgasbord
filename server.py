#!/usr/bin/env python
import web
import view
import json
import random

urls = (
  '/',  'index',
  '/clock', 'clock',
  '/bar', 'barchart',
  '/data.json', 'data',
  '/loader', 'loader',
)

class data:
    def GET(self):
        params  = web.input()
        n = 12
        if "n" in params:
            try:
                n = int(params["n"])
            except:
                pass
        if "r" in params:
            n = int(random.uniform(5,30))

        d = []
        for i in xrange(n):
            d.append(random.uniform(0,50))
        web.header('Content-Type', 'application/json')
        return json.dumps(d)

class index:
    def GET(self):
        return view.render.base(view.render.page(), title="d3 Smorgasbord")

class clock:
    def GET(self):
        return view.render.base(
                view.render.example(
                view.render.clock(view.data(24)), "Clock Chart"), title="d3 Clock Chart")

class barchart:
    def GET(self):
        return view.render.base(
                view.render.example(
                view.render.barchart(view.data(32)), "Simple Bar Chart"), title="d3 Bar Chart")

class loader:
    def GET(self):
        return view.render.base(
                view.render.example(
                    view.render.loader(), "Loading Data"), title="d3 AJAX Data Asynchronously")

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.internalerror = web.debugerror
    app.run()
