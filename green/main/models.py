from django.db import models

# Create your models here.
class Producer(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	image = models.ImageField(upload_to='images/', null=True, blank=True)
	def __unicode__(self):
		return self.name

class Standard(models.Model):
	name = models.CharField(max_length=200)
	def __unicode__(self):
		return self.name

class Category(models.Model):
	name = models.CharField(max_length=200)
	def __unicode__(self):
		return self.name

class Product(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	image = models.ImageField(upload_to='images/', null=True, blank=True)
	category = models.ForeignKey(Category)
	standard = models.ForeignKey(Standard)
	producer = models.ForeignKey(Producer)
	def __unicode__(self):
		return self.name


class Code(models.Model):
	symbol = models.CharField(max_length=25)
	product = models.ForeignKey(Product)
	def __unicode__(self):
		return self.symbol
