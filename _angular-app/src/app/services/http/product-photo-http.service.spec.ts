import { TestBed, inject } from '@angular/core/testing';

import { ProductPhotoHttpService } from './product-photo-http.service';

describe('ProductPhototHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductPhotoHttpService]
    });
  });

  it('should be created', inject([ProductPhotoHttpService], (service: ProductPhotoHttpService) => {
    expect(service).toBeTruthy();
  }));
});
