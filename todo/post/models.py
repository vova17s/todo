from uuid import uuid4

from django.db import models
from user.models import User


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True,
        db_index=True,
        default=uuid4,
        editable=False
    )
    title = models.CharField(max_length=255, blank=False, null=True, verbose_name='Название')
    description = models.TextField(blank=False, null=True, verbose_name='Описание')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    update_time = models.DateTimeField(auto_now=True, verbose_name='Время обновления')
    preview = models.ImageField(blank=True, upload_to='preview')
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    
    def __str__(self) -> str:
        return str(self.title)