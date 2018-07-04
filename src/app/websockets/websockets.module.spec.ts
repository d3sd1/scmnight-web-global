import { WebsocketsModule } from './websockets.module';

describe('WebsocketsModule', () => {
  let singletonModule: WebsocketsModule;

  beforeEach(() => {
    singletonModule = new WebsocketsModule();
  });

  it('should create an instance', () => {
    expect(singletonModule).toBeTruthy();
  });
});
