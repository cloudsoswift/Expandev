# Generated by Django 3.2.13 on 2023-01-25 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roadmaps', '0013_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='role',
            old_name='title',
            new_name='content',
        ),
        migrations.CreateModel(
            name='Situation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=255)),
                ('role', models.ManyToManyField(to='roadmaps.Role')),
            ],
        ),
    ]
