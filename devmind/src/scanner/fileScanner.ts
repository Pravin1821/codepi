import path from 'path';
import fs from 'fs';
import { DevmindStore } from '../memory/store';
import chalk from 'chalk';

const IGNORED_DIRS = [
    'node_modules',
    '.git',
    '.devmind',
    'dist',
    'build',
    'coverage',
    '.next'
]

const IGNORED_EXTENSIONS = [
    '.png','.jpg','.jpeg','.gif','.svg','.ico','.webp',
    '.lock','.log','.zip','.tar','.gz','.ttf','.woff','.woff2',
    '.mp4','.mp3','.wav','.ogg','.flac','.webm','.avi','.mkv'
]

const LANGUAGE_MAP : Record<string,string> = {
  '.ts'   : 'TypeScript',
  '.tsx'  : 'TypeScript',
  '.js'   : 'JavaScript',
  '.jsx'  : 'JavaScript',
  '.java' : 'Java',
  '.py'   : 'Python',
  '.go'   : 'Go',
  '.rs'   : 'Rust',
  '.cpp'  : 'C++',
  '.c'    : 'C',
  '.cs'   : 'C#',
  '.php'  : 'PHP',
  '.rb'   : 'Ruby',
  '.html' : 'HTML',
  '.css'  : 'CSS',
  '.scss' : 'SCSS',
  '.json' : 'JSON',
  '.md'   : 'Markdown',
  '.sql'  : 'SQL',
  '.sh'   : 'Shell',
  '.yml'  : 'YAML',
  '.yaml' : 'YAML',
  '.env'  : 'ENV'
}

function getLanguage(filePath: string): string{
    const extension = path.extname(filePath).toLowerCase();
    return LANGUAGE_MAP[extension] || 'Unknown';
}

function shouldIgnore(filePath: string): boolean{
    const dirName = path.basename(filePath);
    if(IGNORED_DIRS.includes(dirName)){
        return true;
    }
    const extension = path.extname(filePath).toLowerCase();
    if(IGNORED_EXTENSIONS.includes(extension)){
        return true;
    }
    return false;
}

export function scanProject(projectPath: string, store: DevmindStore): string[]{
    const scannedFiles: string[] = [];

    function scanDir(dirPath: string): void{
        let items: string[];
        try{
            items = fs.readdirSync(dirPath);
        }catch(error){
            console.log(chalk.red(`Error reading directory ${dirPath}: ${error}`));
            return;
        }

        for(const item of items)
        {
            const filePath = path.join(dirPath, item);
            if(shouldIgnore(filePath)){
                continue;
            }
            let stat: fs.Stats;
            try{
                stat = fs.statSync(filePath);
            }catch(error){
                console.log(chalk.red(`Error reading file ${filePath}: ${error}`));
                continue;
            }
            if(stat.isDirectory()){
                scanDir(filePath);
            }else{
                const language = getLanguage(filePath);
                let summary = '';
                try{
                    const content = fs.readFileSync(filePath, 'utf-8');
                    summary = content.split('\n').slice(0,50).join('\n');
                }catch(error){
                    summary = '';
                }
                store.addFile(filePath, language, summary);
                scannedFiles.push(filePath);
            }
        }
    }

    scanDir(projectPath);
    return scannedFiles;
}