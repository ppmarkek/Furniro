import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  arrayLinks = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'Shop',
      link: '/shop',
    },
    {
      label: 'About',
      link: '/about',
    },
    {
      label: 'Contact',
      link: '/contact',
    },
  ];

  arrayHelp = [
    {
      label: 'Payment Options',
      link: '/payment-options',
    },
    {
      label: 'Returns',
      link: '/returns',
    },
    {
      label: 'Privacy Policies',
      link: '/privacypolicies',
    },
  ];
}
