import { Component } from '@angular/core';
import { Navbar } from '../../features/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-services-page',
  standalone: true, 
  imports: [ Navbar],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css'
})
export class ServicesPage {

}
