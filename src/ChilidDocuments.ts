import { dirname, relative } from "node:path";
import { globby } from "globby";

export class ChildDocuments {
  protected constructor(
    public readonly rootDocument: string,
    public readonly rootDirectory: string,
    public readonly childDocuments: string[],
  ) {}

  static async search(rootDocument: string) {
    const rootDirectory = dirname(rootDocument);
    const childDocuments = await globby(`${rootDirectory}/**/*.md`).then(
      (entries) =>
        entries
          .filter((entry) => entry !== rootDocument)
          .map((entry) => relative(rootDirectory, entry)),
    );
    return new ChildDocuments(rootDocument, rootDirectory, childDocuments);
  }

  toIndexBlock(header: string) {
    return header.concat("\n\n").concat(
      this.childDocuments
        .toSorted()
        .map((childDocument) => `- [${childDocument}](${childDocument})\n`)
        .join(""),
    );
  }
}
