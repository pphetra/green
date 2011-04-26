from django.contrib import admin
from green.main.models import Product, Code, Category, Standard, Producer

class ProductAdmin(admin.ModelAdmin):
	pass

admin.site.register(Product, ProductAdmin)

class CodeAdmin(admin.ModelAdmin):
	pass

admin.site.register(Code, CodeAdmin)

class CategoryAdmin(admin.ModelAdmin):
	pass

admin.site.register(Category, CategoryAdmin)

class StandardAdmin(admin.ModelAdmin):
	pass

admin.site.register(Standard, StandardAdmin)

class ProducerAdmin(admin.ModelAdmin):
	pass

admin.site.register(Producer, ProducerAdmin)