import { Injectable } from '@rxdi/core';
import { of } from 'rxjs';
const ora = require('ora');

@Injectable()
export class SpinnerService {
    private spinner;

    start(text: string) {
        return of(this.spinner = ora(text).start());
    }

    stop(symbol: string = '', text = '') {
       return of(this.spinner.stopAndPersist({symbol, text}))
    }

    stopAndPersist(symbol: string = '', text = '') {
        return this.spinner.stopAndPersist({symbol, text})
    }
}
