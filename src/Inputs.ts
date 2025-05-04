import { getInput, getMultilineInput } from "@actions/core";

export class Inputs {
  protected constructor(
    public readonly rootPatterns: string[],
    public readonly excludePatterns: string[],
    public readonly header: string,
  ) {}

  public static get(): Inputs {
    const rootPatterns = getMultilineInput("root-patterns");
    const excludePatterns = getMultilineInput("exclude-patterns");
    const header = getInput("header");
    return new Inputs(rootPatterns, excludePatterns, header);
  }
}
