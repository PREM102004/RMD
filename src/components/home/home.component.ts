import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { CompanyTypesComponent } from "../company-types/company-types.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyTypesComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isInView = false; 
  messages: { text: string; sender: string }[] = [];
  userInput: string = '';
 
  isChatOpen: boolean = false;

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

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat(): void {
    this.isChatOpen = false;
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;
    this.messages.push({ text: this.userInput, sender: 'user' });
    const botResponse = this.getBotResponse(this.userInput);
    this.messages.push({ text: botResponse, sender: 'bot' });
    this.userInput = '';
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  getBotResponse(input: string): string {
    input = input.toLowerCase();
  
    if (input.includes("hi") || input.includes("hello")) {
      return "I'm here to assist you! Please ask about schemes, eligibility, or grievances.";
  }
  if (input.includes("complaint") || input.includes("grievance")) {
      return "To raise a grievance:\n1️⃣Click on the ‘Grievance’ tab.\n2️⃣Fill out the form with the required details.\n3️⃣Send us an email at schemesync@gmail.com for further assistance.";
  }
  if (input.includes("scheme") || input.includes("schemes")) {
      return "To explore schemes:\n1️⃣Scroll down the Home tab.\n2️⃣Check out available schemes.\n3️⃣Click on ‘View More’ for details and apply.";
  }
  if (input.includes("eligibility") || input.includes("eligible")) {
      return "To check eligibility:\n1️⃣Go to the ‘Schemes’ tab.\n2️⃣Provide your details.\n3️⃣Get personalized recommendations based on eligibility and apply.";
  }
  if (input.includes("ok") || input.includes("okay") || input.includes("thank you")) {
      return "You're welcome! Do you need any more help?";
  }
  if (input.includes("yes")) {
      return "I'm here to help! You can ask about schemes, eligibility, or how to file a grievance.";
  }
  if (input.includes("no")) {
      return "Thank you! Have a great day.";
  }

  
    return "I'm here to help! You can ask about schemes, eligibility, or how to file a grievance.";
  }
  
}
