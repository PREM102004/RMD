import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { CompanyTypesComponent } from "../company-types/company-types.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyTypesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isInView = false; 

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.checkIfInView();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.checkIfInView();

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const element = document.querySelector('.welcomeste') as HTMLElement;
  
    if (element) {
      if (scrollY > 100) { 
        element.classList.add('scrolled');
      } else {
        element.classList.remove('scrolled');
      }
    }
  }

  private checkIfInView(): void {
    const elementsWithAnimations = [
      { selector: '.banner-content', animationClass: 'animate-banner' },
      { selector: '.banner-content-2', animationClass: 'animate-banner-2' },
    ];
  
    elementsWithAnimations.forEach((item) => {
      const elements = document.querySelectorAll(item.selector);
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
  
        if (isInView) {
          element.classList.add(item.animationClass);
        } else {
          element.classList.remove(item.animationClass);
        }
      });
    });
  }

  goToAbout(){
    this.router.navigateByUrl('/products')
  }
}
