from django.contrib import admin
from green.main.models import Product,Code

class ProductAdmin(admin.ModelAdmin):
	pass

admin.site.register(Product, ProductAdmin)

class CodeAdmin(admin.ModelAdmin):
	pass

admin.site.register(Code, CodeAdmin)
