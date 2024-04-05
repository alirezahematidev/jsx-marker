import { release } from "@vitejs/release-scripts";
import semver from "semver";
import type { Options as ExecaOptions, ExecaReturnValue } from "execa";
import { execa } from "execa";

export async function run(bin: string, args: string[], opts: ExecaOptions = {}): Promise<ExecaReturnValue> {
  return execa(bin, args, { stdio: "inherit", ...opts });
}

export async function getLatestTag(): Promise<string> {
  const tags = (await run("git", ["tag"], { stdio: "pipe" })).stdout.split(/\n/).filter(Boolean);
  return tags.filter((tag) => tag.startsWith("v")).sort((a, b) => semver.rcompare(a.slice(1), b.slice(1)))[0];
}

export async function logRecentCommits(): Promise<void> {
  const tag = await getLatestTag();
  if (!tag) return;
  const sha = await run("git", ["rev-list", "-n", "1", tag], {
    stdio: "pipe",
  }).then((res) => res.stdout.trim());
  await run("git", ["--no-pager", "log", `${sha}..HEAD`, "--oneline", "--", `.`], { stdio: "inherit" });
}

release({
  repo: "jsx-marker",
  packages: ["jsx-marker"],
  toTag: (_, version) => `v${version}`,
  logChangelog: () => logRecentCommits(),
  generateChangelog: async () => {
    const changelogArgs = ["conventional-changelog", "-p", "angular", "-i", "CHANGELOG.md", "-s", "--commit-path", "."];

    await run("npx", changelogArgs, { cwd: process.cwd() });
  },
});
