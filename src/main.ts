import { setFailed } from "@actions/core";
import { globbyStream } from "globby";
import { ChildDocuments } from "./ChilidDocuments";
import { Document } from "./Document";
import { Inputs } from "./Inputs";

export async function run(): Promise<void> {
  try {
    const inputs = Inputs.get();
    const rootDocuments = searchRootDocuments(inputs.rootPatterns);

    for await (const rootDocument of rootDocuments) {
      const childDocuments = await ChildDocuments.search(rootDocument);
      const indexBlock = childDocuments.toIndexBlock(inputs.header);
      const document = await Document.open(rootDocument);
      document.replaceOrAppend(indexBlock);
      await document.save();
    }
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

async function* searchRootDocuments(rootPatterns: string[]) {
  for await (const rootDocument of globbyStream(rootPatterns)) {
    yield rootDocument.toString();
  }
}
