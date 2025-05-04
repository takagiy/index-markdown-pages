import { dirname, join, relative } from "node:path";
import { glob } from "fast-glob";
import { Document } from "./Document";

export class ChildDocuments {
  protected constructor(
    public readonly rootDocument: string,
    public readonly rootDirectory: string,
    public readonly childDocuments: string[],
  ) {}

  static async search(rootDocument: string) {
    const rootDirectory = dirname(rootDocument);
    const childDocuments = await glob(`${rootDirectory}/**/*.md`).then(
      (entries) =>
        entries
          .filter((entry) => entry !== rootDocument)
          .map((entry) => relative(rootDirectory, entry)),
    );
    return new ChildDocuments(rootDocument, rootDirectory, childDocuments);
  }

  async toIndexBlock(header: string): Promise<string> {
    return header.concat("\n\n|title|path|\n|----|----|\n").concat(
      await Promise.all(
        this.childDocuments.toSorted().map(async (childDocument) => {
          const document = await Document.open(
            join(this.rootDirectory, childDocument),
          );
          const title = document.title() ?? "";
          return `|${Document.escape(title)}|[${Document.escape(childDocument)}](${Document.escapeLink(childDocument)})|\n`;
        }),
      ).then((rows) => rows.join("")),
    );
  }
}
