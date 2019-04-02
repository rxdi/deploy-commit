import { Injectable } from "@rxdi/core";
import { tap } from "rxjs/operators";
import {
  Container,
  ExternalImporter,
  FileService,
  ExternalImporterIpfsConfig,
  ConfigService
} from "@rxdi/core";
import { Observable, combineLatest } from "rxjs";
import { includes } from "../../helpers";

export interface PackagesConfig {
  dependencies: string[];
  provider: string;
}

export const loadDeps = (jsonIpfs: PackagesConfig) => {
  if (!jsonIpfs) {
    throw new Error("Missing ipfs config!");
  }
  if (!jsonIpfs.provider) {
    throw new Error("Missing ipfsProvider package.json");
  }
  jsonIpfs.dependencies = jsonIpfs.dependencies || [];

  return jsonIpfs.dependencies
    .map(hash => {
      return { hash, provider: jsonIpfs.provider };
    })
    .filter(res => !!res);
};

export const DownloadDependencies = (
  dependencies: ExternalImporterIpfsConfig[]
): Observable<any> => {
  return Container.get(ExternalImporter).downloadIpfsModules(dependencies);
};

@Injectable()
export class InstallService {
  constructor(
    private externalImporter: ExternalImporter,
    private fileService: FileService,
    private externalImporterConfig: ExternalImporterIpfsConfig,
    private configService: ConfigService
  ) {}
  run() {
    let p = null;
    if (includes("--local-node")) {
      p = this.externalImporter.getProvider("local");
    }

    if (includes("--cloudflare")) {
      p = this.externalImporter.getProvider("cloudflare");
    }

    if (includes("--infura")) {
      p = this.externalImporter.getProvider("infura");
    }

    if (includes("--ipfs")) {
      p = this.externalImporter.getProvider("main-ipfs-node");
    }

    this.externalImporter.defaultProvider =
      p || this.externalImporter.defaultProvider;
    let provider = this.externalImporter.defaultProvider;
    let hash = "";
    let modulesToDownload = [];
    let customConfigFile;
    let packageJsonConfigFile;
    let rxdiConfigFile;
    let json: PackagesConfig[];
    // let interval;

    process.argv.forEach((val, index) => {
      if (index === 3) {
        if (val.length === 46) {
          hash = val;
        } else if (val.includes("--hash=")) {
          hash = val.split("--hash=")[1];
        } else if (val.includes("-h=")) {
          hash = val.split("-h=")[1];
        }
      }
      if (index === 4) {
        if (val.includes("--provider=")) {
          provider = val.split("--provider=")[1];
        } else if (val.includes("http")) {
          provider = val;
        } else if (val.includes("-p=")) {
          provider = val.split("-p=")[1];
        }
      }
    });

    customConfigFile = `${process.cwd()}/${process.argv[3]}`;
    packageJsonConfigFile = `${process.cwd()}/package.json`;
    rxdiConfigFile = `${process.cwd()}/reactive.json`;

    if (!hash && this.fileService.isPresent(customConfigFile)) {
      json = require(customConfigFile).ipfs;
      this.externalImporter.defaultJsonFolder = customConfigFile;
    }

    if (this.fileService.isPresent(packageJsonConfigFile)) {
      json = require(packageJsonConfigFile).ipfs;
      this.externalImporter.defaultJsonFolder = packageJsonConfigFile;
    }

    if (this.fileService.isPresent(rxdiConfigFile)) {
      json = require(rxdiConfigFile).ipfs;
      this.externalImporter.defaultJsonFolder = rxdiConfigFile;
    }
    console.log(`Loaded config ${this.externalImporter.defaultJsonFolder}`);
    console.log("Reactive ipfs modules installing...");
    if (hash) {
      modulesToDownload = [
        DownloadDependencies(
          loadDeps({ provider: p || provider, dependencies: [hash] })
        )
      ];
    }
    if (!hash) {
      json = json || [];
      modulesToDownload = [
        ...modulesToDownload,
        ...json.map(json => {
          json.provider = p || json.provider;
          return DownloadDependencies(loadDeps(json));
        })
      ];
    }
    combineLatest(modulesToDownload)
      .pipe(
        tap(() => (hash ? this.externalImporter.addPackageToJson(hash) : null)),
        tap(() => this.externalImporter.filterUniquePackages())
      )
      .subscribe(
        res => {
          console.log(
            "Default ipfs provider: ",
            p || this.externalImporter.defaultProvider
          );
          console.log(
            `Inside package.json default provider is ${
              this.externalImporter.defaultProvider
            }`
          );
          console.log(
            JSON.stringify(res, null, 2),
            "\nReactive ipfs modules installed!"
          );
          // clearInterval(interval);
        },
        e => {
          throw new Error(e);
        }
      );
  }
}
