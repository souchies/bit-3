import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/home" class="logo-link">
              <span class="logo-icon">🍳</span>
              <span class="logo-text">RecipeHub</span>
            </a>
          </div>
          
          <div class="search-container">
            <div class="search-box">
              <input 
                type="text" 
                placeholder="Search for delicious recipes..."
                [(ngModel)]="searchQuery"
                (keyup.enter)="onSearch()"
                class="search-input"
              >
              <button (click)="onSearch()" class="search-btn">
                🔍
              </button>
            </div>
          </div>
          
          <nav class="nav">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">
              Home
            </a>
            <a routerLink="/home" [queryParams]="{category: 'popular'}" routerLinkActive="active" class="nav-link">
              Popular
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      gap: 20px;
    }

    .logo-link {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #333;
      font-weight: 700;
      font-size: 24px;
      transition: transform 0.3s ease;
    }

    .logo-link:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      font-size: 32px;
    }

    .logo-text {
      background: linear-gradient(135deg, #ff6b6b, #667eea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .search-container {
      flex: 1;
      max-width: 500px;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 100%;
      padding: 12px 50px 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 25px;
      font-size: 16px;
      background: white;
      transition: all 0.3s ease;
      outline: none;
    }

    .search-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-btn {
      position: absolute;
      right: 8px;
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
    }

    .search-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover,
    .nav-link.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
      }

      .search-container {
        max-width: 100%;
        order: 3;
      }

      .nav {
        order: 2;
      }

      .logo {
        order: 1;
      }
    }
  `]
})
export class HeaderComponent {
  searchQuery = '';

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }
} 