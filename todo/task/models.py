import datetime
from uuid import uuid4

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from user.models import User


class Status(models.Model):
    id = models.UUIDField(
        primary_key=True,
        db_index=True,
        default=uuid4,
        editable=False
    )
    title = models.CharField(max_length=255, blank=False, unique=True)
    icon = models.ImageField(upload_to='status/icon/', null=True)
    background = models.CharField(max_length=255, blank=False, unique=True)
    color = models.CharField(max_length=255, blank=False)
    finished = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title

class Task(models.Model):
    id = models.UUIDField(
        primary_key=True,
        db_index=True,
        default=uuid4,
        editable=False
    )
    title = models.CharField(max_length=255, blank=True, null=False, default='Untitled', verbose_name='Название')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    update_time = models.DateTimeField(auto_now=True, verbose_name='Время обновления')
    plane_finished_time = models.DateTimeField(blank=True, null=True, verbose_name='Планируемое время завершения задачи')
    real_finished_time = models.DateTimeField(blank=True, null=True, verbose_name='Реальное время завершения задачи')
    status_id = models.ForeignKey(Status, null=True, on_delete=models.SET_NULL, related_name='task')
    task_id = models.ForeignKey('self', blank=True, null=True, related_name='same_task', on_delete=models.PROTECT)
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.title


@receiver(post_save, sender=Task)
def tast_update_status(instance, **kwargs) -> None:
    edit_task = Task.objects.get(id=instance.id)
    if edit_task.status_id.finished and edit_task.real_finished_time == None:
        edit_task.real_finished_time = datetime.datetime.now()
        edit_task.save()