import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/productInterface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: ProductInterface | null = null;

  getProductImage(product: ProductInterface | null | undefined): string {
    if (product?.imgs && product.imgs.length > 0) {
      return product.imgs[0];
    }
    return 'assets/images/Lolito.png';
  }

  calculateDiscount(
    price?: number,
    discount?: number
  ): { discountAmount: number; finalPrice: number } {
    if (price && discount) {
      if (price < 0 || discount < 0 || discount > 100) {
        throw new Error('Incorrect values ​​for prices or discounts');
      }

      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;

      return { discountAmount, finalPrice };
    }

    const discountAmount = 0;
    const finalPrice = price ?? 0;

    return { discountAmount, finalPrice };
  }
}
