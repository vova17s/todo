from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **other_fields):
        if username is None:
            raise TypeError('User must have a username')
        
        if email is None:
            raise TypeError('User must have an email address')
        
        user = self.model(username=username, email=self.normalize_email(email))
        for field, value in other_fields.items():
            if hasattr(user, field):
                setattr(user, field, value)
        
        user.set_password(password)
        user.save()
        
        return user
    
    def create_superuser(self, email, username='admin', password=None):
        if password is None:
            raise TypeError('Superuser must have a password')
        
        user = self.create_user(username=username, email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, db_index=True)
    first_name = models.CharField(max_length=255, blank=False, verbose_name='Имя')
    last_name = models.CharField(max_length=255, blank=False, verbose_name='Фамилия')
    email = models.EmailField(db_index=True, unique=True, blank=False, max_length=100, verbose_name='Email')
    username = models.CharField(db_index=True, unique=True, max_length=255, blank=False, verbose_name='Username')
    avatar = models.ImageField(blank=True, upload_to='user/avatar', default='media/user/default', verbose_name='Avatar')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    update_time = models.DateTimeField(auto_now=True, verbose_name='Время обновления')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    objects = UserManager()
    

    
    def __str__(self) -> str:
        return self.username
    
    
    class Meta:
        permissions = [
            ("add_post", 'Add Post'),
            ("add_task", 'Add Task'),
            ("todo.update_task", "Update Task"),
            ("todo.update_post", "Update Post"),
        ]