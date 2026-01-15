import type { QuestionName, Language } from './types/question';
import type { PathModule, FileSystem } from './types/nodeTypes.ts';
export declare function stringify(input: unknown): string | undefined;
export declare function stringLogger(input: unknown): string | undefined;
export declare function generateExecutableCodeFile(codeData: string, codeLanguage: Language, qname: QuestionName, codeFolderPath: string, fileName: string, path: PathModule, fs: FileSystem): Promise<string>;
//# sourceMappingURL=drawExecutionCodegenService.d.ts.map