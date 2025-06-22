import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';

interface Restaurant {
  name: string;
  address: string;
  rating: number;
  distance: string;
  priceRange: string;
  specialties: string[];
}

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-detail-container">
      <!-- Loading State -->
      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading recipe details...</p>
      </div>

      <!-- Error State -->
      <div class="error" *ngIf="error">
        <div class="error-icon">😔</div>
        <div class="error-message">{{ error }}</div>
        <button (click)="goBack()" class="btn btn-primary">
          Go Back
        </button>
      </div>

      <!-- Recipe Content -->
      <div class="recipe-content" *ngIf="!loading && !error && recipe">
        <!-- Back Button -->
        <button (click)="goBack()" class="back-btn">
          ← Back to Recipes
        </button>

        <!-- Recipe Header -->
        <div class="recipe-header">
          <div class="recipe-image-container">
            <img [src]="recipe.strMealThumb" [alt]="recipe.strMeal" class="recipe-image">
            <div class="recipe-badge">
              <span class="badge-icon">🍽️</span>
              {{ recipe.strCategory }}
            </div>
          </div>
          
          <div class="recipe-info">
            <h1 class="recipe-title">{{ recipe.strMeal }}</h1>
            <div class="recipe-meta">
              <span class="meta-item">
                <span class="meta-icon">🌍</span>
                {{ recipe.strArea }}
              </span>
              <span class="meta-item" *ngIf="recipe.strTags">
                <span class="meta-icon">🏷️</span>
                {{ recipe.strTags }}
              </span>
            </div>
            
            <div class="recipe-actions">
              <button class="btn btn-primary" (click)="scrollToIngredients()">
                📋 View Ingredients
              </button>
              <a 
                *ngIf="recipe.strYoutube" 
                [href]="recipe.strYoutube" 
                target="_blank" 
                class="btn btn-secondary"
              >
                📺 Watch Video
              </a>
            </div>
          </div>
        </div>

        <!-- Recipe Sections -->
        <div class="recipe-sections">
          <!-- Ingredients Section -->
          <section class="recipe-section" id="ingredients">
            <h2 class="section-title">
              <span class="section-icon">🥘</span>
              Ingredients
            </h2>
            <div class="ingredients-grid">
              <div 
                class="ingredient-card" 
                *ngFor="let ingredient of recipe.ingredients"
              >
                <div class="ingredient-icon">🥄</div>
                <div class="ingredient-info">
                  <span class="ingredient-name">{{ ingredient.name }}</span>
                  <span class="ingredient-measure" *ngIf="ingredient.measure">
                    {{ ingredient.measure }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Instructions Section -->
          <section class="recipe-section">
            <h2 class="section-title">
              <span class="section-icon">📝</span>
              Instructions
            </h2>
            <div class="instructions">
              <p class="instruction-text">{{ recipe.strInstructions }}</p>
            </div>
          </section>

          <!-- Where to Buy Section -->
          <section class="recipe-section">
            <h2 class="section-title">
              <span class="section-icon">🛒</span>
              Where to Buy Ingredients
            </h2>
            <div class="restaurants-grid">
              <div 
                class="restaurant-card" 
                *ngFor="let restaurant of restaurants"
              >
                <div class="restaurant-header">
                  <h3 class="restaurant-name">{{ restaurant.name }}</h3>
                  <div class="restaurant-rating">
                    <span class="stars">
                      <span class="star" *ngFor="let star of [1,2,3,4,5]" 
                            [class.filled]="star <= restaurant.rating">★</span>
                    </span>
                    <span class="rating-text">{{ restaurant.rating }}/5</span>
                  </div>
                </div>
                
                <div class="restaurant-details">
                  <p class="restaurant-address">
                    <span class="detail-icon">📍</span>
                    {{ restaurant.address }}
                  </p>
                  <p class="restaurant-distance">
                    <span class="detail-icon">🚶</span>
                    {{ restaurant.distance }} away
                  </p>
                  <p class="restaurant-price">
                    <span class="detail-icon">💰</span>
                    {{ restaurant.priceRange }}
                  </p>
                </div>
                
                <div class="restaurant-specialties">
                  <span class="specialty-label">Specialties:</span>
                  <div class="specialties-list">
                    <span 
                      class="specialty-tag" 
                      *ngFor="let specialty of restaurant.specialties"
                    >
                      {{ specialty }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipe-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .back-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .back-btn:hover {
      background: white;
      transform: translateX(-4px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .recipe-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
      align-items: start;
    }

    .recipe-image-container {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .recipe-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .recipe-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.95);
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .badge-icon {
      font-size: 16px;
    }

    .recipe-info {
      color: white;
    }

    .recipe-title {
      font-size: 36px;
      font-weight: 800;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .recipe-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 500;
    }

    .meta-icon {
      font-size: 16px;
    }

    .recipe-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .recipe-sections {
      display: grid;
      gap: 40px;
    }

    .recipe-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-icon {
      font-size: 28px;
    }

    .ingredients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .ingredient-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .ingredient-card:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }

    .ingredient-icon {
      font-size: 24px;
    }

    .ingredient-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ingredient-name {
      font-weight: 600;
      color: #333;
    }

    .ingredient-measure {
      font-size: 14px;
      color: #666;
    }

    .instructions {
      line-height: 1.8;
      color: #333;
      font-size: 16px;
    }

    .instruction-text {
      white-space: pre-line;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .restaurant-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .restaurant-card:hover {
      transform: translateY(-4px);
      border-color: #ff6b6b;
      box-shadow: 0 8px 30px rgba(255, 107, 107, 0.2);
    }

    .restaurant-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .restaurant-name {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .restaurant-rating {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      color: #ddd;
      font-size: 16px;
    }

    .star.filled {
      color: #ffd700;
    }

    .rating-text {
      font-size: 14px;
      font-weight: 600;
      color: #666;
    }

    .restaurant-details {
      margin-bottom: 16px;
    }

    .restaurant-details p {
      margin: 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 14px;
    }

    .detail-icon {
      font-size: 16px;
    }

    .restaurant-specialties {
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    .specialty-label {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      display: block;
      margin-bottom: 8px;
    }

    .specialties-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .specialty-tag {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .recipe-header {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .recipe-title {
        font-size: 28px;
      }

      .recipe-meta {
        gap: 12px;
      }

      .recipe-actions {
        flex-direction: column;
      }

      .recipe-section {
        padding: 24px;
      }

      .ingredients-grid {
        grid-template-columns: 1fr;
      }

      .restaurants-grid {
        grid-template-columns: 1fr;
      }

      .restaurant-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
    }
  `]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = false;
  error = '';
  restaurants: Restaurant[] = [];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadRecipe(id);
      }
    });
  }

  loadRecipe(id: string) {
    this.loading = true;
    this.error = '';

    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.recipe = recipe;
          this.generateMockRestaurants();
        } else {
          this.error = 'Recipe not found';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load recipe. Please try again.';
        this.loading = false;
      }
    });
  }

  generateMockRestaurants() {
    const restaurantNames = [
      'Fresh Market Grocery',
      'Organic Foods Co.',
      'Local Farmers Market',
      'Gourmet Ingredients Store',
      'Healthy Living Market',
      'Artisan Food Shop',
      'International Foods',
      'Premium Grocers'
    ];

    const addresses = [
      '123 Main Street, Downtown',
      '456 Oak Avenue, Midtown',
      '789 Pine Road, Uptown',
      '321 Elm Street, Westside',
      '654 Maple Drive, Eastside',
      '987 Cedar Lane, Northside',
      '147 Birch Boulevard, Southside',
      '258 Spruce Court, Central'
    ];

    const specialties = [
      ['Organic Produce', 'Fresh Herbs', 'Local Dairy'],
      ['Gourmet Ingredients', 'International Foods', 'Artisan Bread'],
      ['Farm Fresh', 'Seasonal Produce', 'Free Range Eggs'],
      ['Premium Meats', 'Fresh Seafood', 'Cheese Selection'],
      ['Health Foods', 'Gluten Free', 'Vegan Options'],
      ['Bakery Items', 'Deli Meats', 'Gourmet Cheese'],
      ['Asian Ingredients', 'Mediterranean Foods', 'Latin Products'],
      ['Organic Groceries', 'Natural Foods', 'Specialty Items']
    ];

    this.restaurants = restaurantNames.map((name, index) => ({
      name,
      address: addresses[index],
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      distance: `${Math.floor(Math.random() * 5) + 1} km`,
      priceRange: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)],
      specialties: specialties[index]
    }));
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  scrollToIngredients() {
    const element = document.getElementById('ingredients');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
} 