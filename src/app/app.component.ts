import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/general/header/header.component";
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from "../components/general/footer/footer.component";
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sri Thirumurugan Engineering';
  constructor(
    private titleService: Title,
    private metaService: Meta
  ){}
  ngOnItit(){

    AOS.init();
    this.titleService.setTitle("Sri Thirumurugan Engineering");
    this.metaService.addTags([
      { name: 'keywords', content: 'Sri Thirumurugan , Sri Thirumurugan Engineering, Thirumurugan Engineering' },
      { name: 'description', content: 'Sri Thirumurugan , Sri Thirumurugan Engineering, Thirumurugan Engineering' },
    ]);
   }
}
