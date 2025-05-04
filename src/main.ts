import { setFailed } from "@actions/core";
import { globStream } from "fast-glob";
import { ChildDocuments } from "./ChilidDocuments";
import { Document } from "./Document";
import { Git } from "./Git";
import { Inputs } from "./Inputs";

export async function run(): Promise<void> {
  try {
    const inputs = Inputs.get();
    const rootDocuments = searchRootDocuments(inputs.rootPatterns, {
      excludePatterns: inputs.excludePatterns,
    });

    const modifiedFiles: string[] = [];

    for await (const rootDocument of rootDocuments) {
      const childDocuments = await ChildDocuments.search(rootDocument, {
        excludePatterns: inputs.excludePatterns,
      });
      const indexBlock = await childDocuments.toIndexBlock(inputs.header);
      const document = await Document.open(rootDocument);
      await document.replaceOrAppend(indexBlock);
      await document.save();
      modifiedFiles.push(rootDocument);
    }

    const git = Git.of(inputs.git);
    await git.commitAndPush(modifiedFiles);
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

async function* searchRootDocuments(
  rootPatterns: string[],
  opts: { excludePatterns: string[] },
) {
  for await (const rootDocument of globStream(rootPatterns, {
    onlyFiles: true,
    ignore: opts.excludePatterns,
  })) {
    yield rootDocument.toString();
  }
}
