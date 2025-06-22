import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="recipe-card" [routerLink]="['/recipe', recipe.idMeal]">
      <div class="card-image">
        <img [src]="recipe.strMealThumb" [alt]="recipe.strMeal" class="recipe-image">
        <div class="card-overlay">
          <div class="overlay-content">
            <span class="view-recipe">View Recipe</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <h3 class="recipe-title">{{ recipe.strMeal }}</h3>
        
        <div class="recipe-meta">
          <span class="category">
            <span class="icon">🍽️</span>
            {{ recipe.strCategory }}
          </span>
          <span class="area">
            <span class="icon">🌍</span>
            {{ recipe.strArea }}
          </span>
        </div>
        
        <div class="recipe-tags" *ngIf="recipe.strTags">
          <span 
            class="tag" 
            *ngFor="let tag of getTags()"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="ingredients-preview">
          <span class="ingredients-label">Ingredients:</span>
          <span class="ingredients-text">
            {{ getIngredientsPreview() }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipe-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .recipe-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .recipe-card:hover .recipe-image {
      transform: scale(1.1);
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(102, 126, 234, 0.9));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .recipe-card:hover .card-overlay {
      opacity: 1;
    }

    .overlay-content {
      color: white;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
    }

    .arrow {
      display: block;
      font-size: 24px;
      margin-top: 4px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(0);
      }
      40% {
        transform: translateX(10px);
      }
      60% {
        transform: translateX(5px);
      }
    }

    .card-content {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .recipe-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin-bottom: 12px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .recipe-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .category,
    .area {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #666;
      background: #f8f9fa;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: 500;
    }

    .icon {
      font-size: 14px;
    }

    .recipe-tags {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .tag {
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      color: white;
      padding: 4px 8px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ingredients-preview {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }

    .ingredients-label {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      display: block;
      margin-bottom: 4px;
    }

    .ingredients-text {
      font-size: 12px;
      color: #888;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .recipe-card {
        border-radius: 16px;
      }

      .card-content {
        padding: 16px;
      }

      .recipe-title {
        font-size: 16px;
      }

      .recipe-meta {
        gap: 12px;
      }
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  getTags(): string[] {
    if (!this.recipe.strTags) return [];
    return this.recipe.strTags.split(',').map(tag => tag.trim()).slice(0, 3);
  }

  getIngredientsPreview(): string {
    const ingredients = this.recipe.ingredients.slice(0, 4);
    return ingredients.map(ing => ing.name).join(', ') + 
           (this.recipe.ingredients.length > 4 ? '...' : '');
  }
} 