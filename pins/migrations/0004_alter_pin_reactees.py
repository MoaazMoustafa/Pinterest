# Generated by Django 3.2.9 on 2021-11-22 18:37

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pins', '0003_alter_pin_topics'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='reactees',
            field=models.ManyToManyField(blank=True, related_name='reacted_on', to=settings.AUTH_USER_MODEL),
        ),
    ]