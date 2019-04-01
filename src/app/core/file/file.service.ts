import { Injectable } from '@rxdi/core';
import { readFileSync } from 'fs';
import { switchMap } from 'rxjs/operators';
import { stat, readdir } from 'fs';
import { resolve } from 'path';
import { from } from 'rxjs';
import { IFolderStructureType, IFileStatusType } from '../api-introspection';

@Injectable()
export class FileService {
  units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  results: string[] = [];

  private read(name: 'package.json' | 'reactive.json') {
    let file: string;
    try {
      file = readFileSync(`${process.cwd()}/${name}`, {
        encoding: 'utf-8'
      });
    } catch (e) {}
    return file;
  }

  readReactiveJson() {
    return this.read('reactive.json');
  }

  readPackageJson() {
    return this.read('package.json');
  }

  async wholeReadDirRecursive(path: string = '.') {
    const directory = await this.readDir(path);
    const pathinternal = path;
    const self = this;
    return (await Promise.all(
      directory.map(async file => {
        const path = resolve(pathinternal, file);
        const stat = await this.statAsync(path);
        if (stat && stat.isDirectory()) {
          if (!file.includes('node_modules')) {
            await self.wholeReadDirRecursive.bind(this)(path);
          } else {
            return null;
          }
        } else {
          this.results = [...this.results, path];
        }
      })
    )).filter(a => !!a);
  }

  async readCurrentDirFlat(path: string = '.') {
    return (await this.readDir(path))
      .map(file => resolve(path, file))
      .filter(a => !!a);
  }

  listFolder(folder: string) {
    return from(this.readCurrentDirFlat(folder))
    .pipe(switchMap(res => this.map(res)))
  }

  async readDir(folder: string, limit: number = 200) {
    return await new Promise<string[]>((resolve, reject) => {
      readdir(folder, (err, list: string[]) => {
        if (err) {
          resolve([]);
        } else {
          let count = 0;
          resolve(
            list
              .map(f => {
                count++;
                if (limit > count) {
                  return f;
                } else {
                  return null;
                }
              })
              .filter(res => !!res)
          );
        }
      });
    });
  }

  async map(res): Promise<IFolderStructureType[]> {
    let foldersCount = 100;
    let counter = 0;
    return (await Promise.all<IFolderStructureType>(
      res.map(async r => {
        counter++;
        const mapping: IFolderStructureType = {
          path: r,
          directory: null,
          file: null,
          name: null,
          status: null
        };
        const status = await this.statAsync(r);
        const pathMapping = v => r.replace(process.cwd(), v);

        if (!status.isDirectory || (status && status['prototype'] === String)) {
          return null;
        }
        if (status.isDirectory()) {
          mapping.directory = true;
        } else {
          mapping.file = true;
        }
        mapping.name = r.split('/').pop();
        mapping.path = pathMapping('.');

        mapping.path = r;

        mapping.status = status as IFileStatusType | any;
        mapping.status.size = this.niceBytes(status.size);
        if (counter === foldersCount) {
          return null;
        }
        return mapping;
      })
    )).filter(res => !!res);
  }

  private niceBytes(x) {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + this.units[l];
  }

  async statAsync(path: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      stat(path, (e, stats) => {
        if (e) {
          resolve(e);
        }
        resolve(stats);
      });
    });
  }
}
