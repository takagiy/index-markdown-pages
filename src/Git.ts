import { info } from "@actions/core";
import SimpleGit from "simple-git";

export class Git {
  protected constructor(
    public readonly doesCommit: boolean,
    public readonly commitOn: string,
    public readonly commitMessage: string,
    public readonly doesPush: boolean,
  ) {}

  static of(opts: {
    commit: boolean;
    commitOn: string;
    commitMessage: string;
    push: boolean;
  }): Git {
    return new Git(opts.commit, opts.commitOn, opts.commitMessage, opts.push);
  }

  async commitAndPush(modifiedFiles: string[]) {
    if (!this.doesCommit) {
      return;
    }

    const git = SimpleGit(process.cwd());
    await git.addConfig("user.name", "GitHub Actions");
    await git.addConfig("user.email", "action@github.com");
    const currentBranch = await git
      .branchLocal()
      .then((branchs) => branchs.current);
    try {
      const commitBranch = await git.revparse(["--abbrev-ref", this.commitOn]);

      info(`Commit changes to "${commitBranch}".`);
      await git.checkout(commitBranch);
      await git.add(modifiedFiles);
      await git.commit(this.commitMessage);

      if (this.doesPush) {
        info(`Push changes to "${commitBranch}".`);
        await git.pull("origin", commitBranch, ["--rebase"]);
        await git.push();
      }
    } finally {
      await git.checkout(currentBranch);
    }
  }
}
