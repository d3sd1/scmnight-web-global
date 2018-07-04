import { LoggedinModule } from './loggedin.module';

describe('LoggedinModule', () => {
  let loggedinModule: LoggedinModule;

  beforeEach(() => {
    loggedinModule = new LoggedinModule();
  });

  it('should create an instance', () => {
    expect(loggedinModule).toBeTruthy();
  });
});
