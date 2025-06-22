import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <div class="error-emoji">😅</div>
        <h1 class="error-title">Oops! Page Not Found</h1>
        <p class="error-message">
          The recipe you're looking for seems to have wandered off to the kitchen! 
          Let's get you back to cooking delicious meals.
        </p>
        <div class="error-actions">
          <a routerLink="/home" class="btn btn-primary">
            🏠 Go Home
          </a>
          <button (click)="goBack()" class="btn btn-secondary">
            ← Go Back
          </button>
        </div>
        <div class="error-suggestions">
          <h3>Try these instead:</h3>
          <div class="suggestion-links">
            <a routerLink="/home" [queryParams]="{category: 'popular'}">🍖 Popular Recipes</a>
            <a routerLink="/home" [queryParams]="{category: 'Italian'}">🍝 Italian Cuisine</a>
            <a routerLink="/home" [queryParams]="{category: 'Mexican'}">🌮 Mexican Food</a>
            <a routerLink="/home" [queryParams]="{category: 'Asian'}">🍜 Asian Dishes</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .not-found-content {
      text-align: center;
      max-width: 600px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      padding: 48px 32px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .error-code {
      font-size: 120px;
      font-weight: 900;
      color: #ff6b6b;
      line-height: 1;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error-emoji {
      font-size: 64px;
      margin-bottom: 24px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    .error-title {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin-bottom: 16px;
    }

    .error-message {
      font-size: 18px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .error-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .error-suggestions {
      border-top: 1px solid #eee;
      padding-top: 32px;
    }

    .error-suggestions h3 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .suggestion-links {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .suggestion-links a {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .suggestion-links a:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }

    @media (max-width: 768px) {
      .not-found-content {
        padding: 32px 24px;
      }

      .error-code {
        font-size: 80px;
      }

      .error-emoji {
        font-size: 48px;
      }

      .error-title {
        font-size: 24px;
      }

      .error-message {
        font-size: 16px;
      }

      .error-actions {
        flex-direction: column;
        align-items: center;
      }

      .suggestion-links {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class NotFoundComponent {
  constructor() {}

  goBack() {
    window.history.back();
  }
} 