# Django Mockup for ReviewMint

## models.py (Conceptual)

```python
from django.db import models
from django.contrib.auth.models import User

class Destination(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    tagline = models.CharField(max_length=255)
    description = models.TextField()
    hero_image = models.ImageField(upload_to='destinations/')
    verdict = models.CharField(max_length=100) # e.g. "Highly Recommended"
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    
    # Effort vs Result Metrics
    money_score = models.IntegerField() # 0-100
    time_score = models.IntegerField()
    fatigue_score = models.IntegerField()
    payoff_score = models.IntegerField()
    
    def __str__(self):
        return self.name

class ReachOption(models.Model):
    destination = models.ForeignKey(Destination, related_name='reach_options', on_delete=models.CASCADE)
    type = models.CharField(max_length=50) # Flight, Train, Bus
    detail = models.CharField(max_length=100)
    time_estimate = models.CharField(max_length=50)
    nearest_hub = models.CharField(max_length=100)
    average_cost = models.CharField(max_length=50)

class ItineraryItem(models.Model):
    destination = models.ForeignKey(Destination, related_name='itinerary', on_delete=models.CASCADE)
    time = models.CharField(max_length=20)
    place = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    description = models.TextField()
    
    # Personalities as a stored flag or ManyToMany
    # For now, simplistic CSV or separate Tag model
    personality_tags = models.CharField(max_length=255) # "Introvert,History Lover"

class UserReview(models.Model):
    destination = models.ForeignKey(Destination, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

## Data Structure (Agra JSON)

```json
{
    "id": "agra",
    "name": "Agra",
    "tagline": "Is the City of Love worth the hype?",
    "verdict": "Highly Recommended for First-Timers",
    "rating": 8.4,
    "reach": [...],
    "matrix": {
        "money": 40,
        "time": 80,
        "fatigue": 75,
        "payoff": 95
    },
    ...
}
```
