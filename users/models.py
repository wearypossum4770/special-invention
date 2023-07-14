from typing import Iterable, Optional

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models import (CASCADE, CharField, ForeignKey, ImageField,
                              Model, OneToOneField, SlugField, TextField,
                              UUIDField)
from PIL import Image

# https://pillow.readthedocs.io/en/latest/handbook/tutorial.html
size = (128, 128)


class User(AbstractUser):
    pass


class Profile(Model):
    user = OneToOneField(settings.AUTH_USER_MODEL, on_delete=CASCADE)
    avatar = ImageField(default="default.jpg", upload_to="avatar_images")

    def __str__(self) -> str:
        return f"{self.user.username} Profile"

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)
        print(self.avatar.path)

        # with Image.open(self.avatar.path) as img:
        #     img.thumbnail(size)
        #     img.save(outfile, 'webp')

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)

    #     img = Image.open(self.image.path)

    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)
