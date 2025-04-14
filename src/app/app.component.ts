import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = '';
  current = '';
  showGallery = false;
  isCalculatorFocused = false;

  buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+' ];

  images = [
    { src: 'assets/images/img-1.jfif' },
    { src: 'assets/images/img-2.jfif' },
    { src: 'assets/images/img-3.jfif' },
  ];

  imagePreviews: any[] = [];

  onCalcClick(val: string) {
    if (!this.isCalculatorFocused) return;

    if (/[\d+\-*/=C]/.test(val)) {
      if (val === 'C') {
        this.display = '';
        this.current = '';
      } else if (val === '=') {
        try {
          this.display = eval(this.current);
          this.current = this.display;
        } catch {
          this.display = 'Error';
        }
      } else {
        this.current += val;
        this.display = this.current;
      }
    }
  }

  openGallery() {
    this.showGallery = true;
  }

  openImagePreview(img: any) {
    const id = 'preview-' + Date.now();
    this.imagePreviews.push({ id, src: img.src });
  }

  closePreview(id: string) {
    this.imagePreviews = this.imagePreviews.filter(p => p.id !== id);
  }

  addCaption(previewId: string) {
    const container = document.getElementById(previewId + '-container')?.parentElement;
    if (!container) return;

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.contentEditable = 'true';
    caption.innerText = 'Edit me';
    caption.style.top = '50%';
    caption.style.left = '50%';

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Caption dragging functionality
    caption.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      caption.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      caption.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDragging) {
        caption.style.left = `${e.pageX - offsetX}px`;
        caption.style.top = `${e.pageY - offsetY}px`;
      }
    });

    // Double-click to edit caption
    caption.addEventListener('dblclick', () => {
      caption.contentEditable = caption.contentEditable === 'true' ? 'false' : 'true';
    });

    container.appendChild(caption);
  }

  onModalShown() {
    this.isCalculatorFocused = true;
  }

  onModalHidden() {
    this.isCalculatorFocused = false;
  }



  
}
