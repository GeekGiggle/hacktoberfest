from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    todo_name = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.todo_name