import { LoggedoutModule } from './loggedout.module';

describe('LoggedoutModule', () => {
  let loggedoutModule: LoggedoutModule;

  beforeEach(() => {
    loggedoutModule = new LoggedoutModule();
  });

  it('should create an instance', () => {
    expect(loggedoutModule).toBeTruthy();
  });
});
