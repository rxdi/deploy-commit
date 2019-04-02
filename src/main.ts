#! /usr/bin/env node
import { Bootstrap } from "@rxdi/core";
import { AppModule } from "./app/app.module";

Bootstrap(AppModule).subscribe();