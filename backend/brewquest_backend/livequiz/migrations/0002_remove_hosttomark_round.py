# Generated by Django 4.2.8 on 2024-04-07 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('livequiz', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hosttomark',
            name='round',
        ),
    ]