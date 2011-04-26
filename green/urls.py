from django.conf.urls.defaults import *
from django.conf import settings
from main.views import product_get, manifest

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^green/', include('green.foo.urls')),
    (r'^product$', product_get),
    (r'^manifest\.cache$', manifest),

    (r'^sync/$', 'main.views.sync'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('green.main.views',
	url(r'^index.html$', 'index', name='index'),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )