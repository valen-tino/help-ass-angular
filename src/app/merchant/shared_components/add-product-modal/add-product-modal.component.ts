import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MainApiServiceService, Product } from '../../../services/main-api-service.service'; 

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {
  @Input() merchantId: string | undefined;

  newProduct = {
    name: '',
    slug: '',
    description: '',
    excerpt: '',
    price: 0,
    category: '',
    productImages: [] as File[],
  };

  imagePreviews: string[] = []; // For displaying image previews 

  @Output() productAdded = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>(); // Event emitter for closing modal

  constructor(private apiService: MainApiServiceService) {}

   // Check if all required fields are filled
   isFormValid(): boolean {    
    const isNameValid = this.newProduct.name.trim() !== '';
    const isDescriptionValid = this.newProduct.description.trim() !== '';
    const isExcerptValid = this.newProduct.excerpt.trim() !== '';
    const isPriceValid = this.newProduct.price > 0;
    const isCategoryValid = this.newProduct.category.trim() !== '';
    const areImagesValid = this.imagePreviews.length > 0;
  
    return isNameValid && isDescriptionValid && isExcerptValid && isPriceValid && isCategoryValid && areImagesValid;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.imagePreviews = []; 
      this.newProduct.productImages = []; 
  
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result as string); // Add the file preview
        };
        reader.readAsDataURL(file);
    
        this.newProduct.productImages.push(file); // Store the File object
      });
    }
  }  

  onSubmit() {
    if (this.isFormValid()) {
      // Check if merchantId is defined
      if (this.merchantId) {

        const formData = new FormData();
        this.newProduct.productImages.forEach((file) => {
          formData.append('images', file); // Append the File object directly
        });


        this.apiService.uploadProductImages(this.merchantId, formData).subscribe({
          next: (uploadResponse) => {
            console.log('Upload Response:', uploadResponse);
            const productDetails: Product = {
              ...this.newProduct,
              title: this.newProduct.name,
              productID: this.generateProductID(),
              productImages: uploadResponse.imageUrls,
              slug: this.generateSlug(this.newProduct.name),
              merchant: this.merchantId,

              // Defaults or server-set fields
              merchantName: '',
              companyRegionLocation: '',
              avaliable: true,
              rating: 1
            };

            // Now call addNewProduct with the full product details
            this.apiService.addNewProduct(this.merchantId!, productDetails).subscribe({
              next: product => {
                this.productAdded.emit(product);
                alert('Your product is successfully added');
                window.location.reload();
              },
              error: error => console.error('Error adding product:', error)
            });
            

          },
          error: error => console.error('Error uploading images:', error)
        });
      } else {
        alert('Merchant ID is undefined.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  generateSlug(name: string): string {
    return name.toLowerCase().split(' ').join('-');
  }
  
  generateProductID(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }

  closeModal() {
    this.closeModalEvent.emit(); // Emit an event to close the modal
  }
}
