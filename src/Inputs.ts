import { getBooleanInput, getInput, getMultilineInput } from "@actions/core";

export class Inputs {
  protected constructor(
    public readonly rootPatterns: string[],
    public readonly excludePatterns: string[],
    public readonly header: string,
    public readonly git: {
      commit: boolean;
      commitOn: string;
      commitMessage: string;
      push: boolean;
    },
  ) {}

  public static get(): Inputs {
    const rootPatterns = getMultilineInput("root-patterns");
    const excludePatterns = getMultilineInput("exclude-patterns").filter(
      (pattern) => pattern !== "",
    );
    const header = getInput("header");
    const commit = getBooleanInput("commit");
    const commitOn = getInput("commit-on");
    const commitMessage = getInput("commit-message");
    const push = getBooleanInput("push");
    return new Inputs(rootPatterns, excludePatterns, header, {
      commit,
      commitOn,
      commitMessage,
      push,
    });
  }
}
