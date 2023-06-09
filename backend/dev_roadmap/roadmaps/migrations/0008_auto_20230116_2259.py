# Generated by Django 3.2.13 on 2023-01-16 13:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roadmaps', '0007_auto_20230116_2258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='difficulty',
            field=models.IntegerField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.AlterField(
            model_name='review',
            name='importance',
            field=models.IntegerField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
