# Generated by Django 3.2.9 on 2021-11-16 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
