# Generated by Django 5.0.2 on 2024-03-16 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='enrollment_no',
            field=models.BigIntegerField(default=1),
            preserve_default=False,
        ),
    ]