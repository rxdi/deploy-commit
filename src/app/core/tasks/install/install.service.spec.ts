import 'jest';
import { Container, createTestBed } from '@gapi/core';
import { InstallService } from './install.service';

describe('Install Service', () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [InstallService]
    }).toPromise();
  });

  it('should be defined', done => {
    expect(Container.has(InstallService)).toBeTruthy();
    done();
  });
});
