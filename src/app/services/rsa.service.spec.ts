import { TestBed } from '@angular/core/testing';

import { EncryptHelper } from './rsa.service';

describe('EncryptHelper', () => {
  let service: EncryptHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
