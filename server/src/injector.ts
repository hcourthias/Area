import { Injector } from '@booster-ts/core';
import * as fs from 'fs';
import * as path from 'path';

export const inject = new Injector();

/**
 * loadFiles
 * @description Imports Recursively all files
 * @param dirName where to search the files
 */
export const loadFiles = (dirName: string): void => {
    let fileLoaded = false;
    let relativeDir;
    if (!path.isAbsolute(dirName))
        relativeDir = path.join(__dirname, dirName);
    else
        relativeDir = dirName;
    const contents = fs.readdirSync(relativeDir);
    for (const content of contents) {
        const filePath = path.join(relativeDir, content);
        if (fs.statSync(filePath).isDirectory())
            loadFiles(filePath);
        else if (!fileLoaded) {
            require(path.join(dirName, path.basename(dirName)));
            fileLoaded = true;
        }
    }
};
