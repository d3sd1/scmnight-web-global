import { TestBed, inject } from '@angular/core/testing';

import { WebsocketsConnectorService } from './websockets-connector.service';

describe('WebsocketsConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketsConnectorService]
    });
  });

  it('should be created', inject([WebsocketsConnectorService], (service: WebsocketsConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
