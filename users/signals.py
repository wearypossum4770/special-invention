from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import Profile
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    print(instance)
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.profile.asave()
