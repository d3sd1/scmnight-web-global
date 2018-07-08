import { TranslateModule } from './language.module';

describe('TranslateModule', () => {
  let translateModule: TranslateModule;

  beforeEach(() => {
    translateModule = new TranslateModule();
  });

  it('should create an instance', () => {
    expect(translateModule).toBeTruthy();
  });
});
