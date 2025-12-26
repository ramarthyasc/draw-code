import { spawn } from 'child_process';
import * as path from "path";
import * as fs from "fs";

// or you can use this - much better.
// as here, module's real (not type) objects are not created/loaded at runtime.
// Here, import("fs") is not executed at runtime. TypeScript treats it as a type query only
// 
// type Spawn = typeof import("child_process").spawn;
// type FileSystem = typeof import("fs");
// type PathModule = typeof import("path");
export type Spawn = typeof spawn;
export type FileSystem = typeof fs;
export type PathModule = typeof path;

