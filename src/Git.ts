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

  async commitAndPush() {
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
      await git.checkout(this.commitOn);
      await git.commit(this.commitMessage);
      if (this.doesPush) {
        await git.pull("origin", this.commitOn, ["--rebase"]);
        await git.push();
      }
    } finally {
      await git.checkout(currentBranch);
    }
  }
}
