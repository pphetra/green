# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse

import simplejson as json
import os
import settings

from main.models import Code,Product

def render(request, *args, **kwargs):
    context = RequestContext(request, {})
    kwargs['context_instance'] = context
    return render_to_response(*args, **kwargs)

def index(request):
	context = {

	}
	return render(request, 'index.html', context)

def product_get(request):
	print request.method
	if request.method == 'POST':
		symbol = request.REQUEST["code"]
		print symbol
		results = Code.objects.filter(symbol=symbol)
		data = results.values('symbol', 'product__name', 'product__id')
		results = {
			'success': True,
			'rows': list(data)
		}
		response = HttpResponse(json.dumps(results), content_type="application/json")
		response['Access-Control-Allow-Origin'] = '*'
		response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
		response['Access-Control-Allow-Headers'] = 'X-Requested-With'
		return response
	elif request.method == 'OPTIONS':
		print request.META
		response = HttpResponse()
		response['Access-Control-Allow-Origin'] = '*'
		response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
		response['Access-Control-Allow-Headers'] = 'X-Requested-With'
		return response

def manifest(request):
	context = {
		'files': os.listdir(settings.MEDIA_ROOT + '/images')
	}
	return render(request, 'manifest', context, mimetype="text/cache-manifest")