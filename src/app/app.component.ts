import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayValue = '0';
  operator: string | null = null;
  firstOperand: number | null = null;
  waitingForSecondOperand = false;
  showGallery = false;

images = [
  { src: 'assets/images/img-1.jfif' },
  { src: 'assets/images/img-2.jfif' },
  { src: 'assets/images/img-3.jfif' },
];

imagePreviews: any[] = [];
inputDigit(digit: string) {
  if (this.waitingForSecondOperand) {
    this.displayValue = digit;
    this.waitingForSecondOperand = false;
  } else {
    this.displayValue =
      this.displayValue === '0' ? digit : this.displayValue + digit;
  }
}

inputDecimal(dot: string) {
  if (this.waitingForSecondOperand) {
    this.displayValue = '0.';
    this.waitingForSecondOperand = false;
    return;
  }

  if (!this.displayValue.includes(dot)) {
    this.displayValue += dot;
  }
}

clear() {
  this.displayValue = '0';
  this.firstOperand = null;
  this.operator = null;
  this.waitingForSecondOperand = false;
}

toggleSign() {
  this.displayValue = String(parseFloat(this.displayValue) * -1);
}

inputPercent() {
  const currentValue = parseFloat(this.displayValue);
  if (currentValue === 0) return;
  this.displayValue = String(currentValue / 100);
}

handleOperator(nextOperator: string) {
  const inputValue = parseFloat(this.displayValue);

  if (this.operator && this.waitingForSecondOperand) {
    this.operator = nextOperator;
    return;
  }

  if (this.firstOperand == null) {
    this.firstOperand = inputValue;
  } else if (this.operator) {
    const result = this.performCalculation(this.operator, this.firstOperand, inputValue);
    this.displayValue = String(result);
    this.firstOperand = result;
  }

  this.operator = nextOperator;
  this.waitingForSecondOperand = true;
}

performCalculation(operator: string, first: number, second: number): number {
  switch (operator) {
    case '+': return first + second;
    case '-': return first - second;
    case '×': return first * second;
    case '÷': return second !== 0 ? first / second : 0;
    default: return second;
  }
}

calculate() {
  if (this.operator && this.firstOperand != null) {
    const secondOperand = parseFloat(this.displayValue);
    const result = this.performCalculation(this.operator, this.firstOperand, secondOperand);
    this.displayValue = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}

openGallery() {
  this.showGallery = true;
}

openImagePreview(img: any) {
  const previewId = 'preview-' + Math.random().toString(36).substr(2, 9);
  this.imagePreviews.push({ id: previewId, src: img.src });
}

closePreview(previewId: string) {
  this.imagePreviews = this.imagePreviews.filter(p => p.id !== previewId);
}

addCaption(previewId: string) {
  alert('Caption added to image ID: ' + previewId);
}

}

