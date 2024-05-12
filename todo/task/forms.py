from django import forms

from .models import Task


class CreateTaskForm(forms.ModelForm):
    
    class Meta:
        model = Task
        fields = ['title', 'description', 'plane_finished_time', 'task_id', 'status_id']
