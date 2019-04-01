import { IFolderStructureType } from '../api-introspection';
export declare class FileService {
    units: string[];
    results: string[];
    private read;
    readReactiveJson(): string;
    readPackageJson(): string;
    wholeReadDirRecursive(path?: string): Promise<any[]>;
    readCurrentDirFlat(path?: string): Promise<string[]>;
    listFolder(folder: string): import("rxjs/internal/Observable").Observable<IFolderStructureType[]>;
    readDir(folder: string, limit?: number): Promise<string[]>;
    map(res: any): Promise<IFolderStructureType[]>;
    private niceBytes;
    statAsync(path: string): Promise<any>;
}
