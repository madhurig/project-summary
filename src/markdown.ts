import { IssueInfo, ProjectInfo } from './types'

export function* generateSummary(title: string, url: string) {
    yield h3(`${link(title, url)}`);
    yield `\n`;
}

export function* generateIssuesSection(title: string, issues: IssueInfo[]) {
    yield h2(title);
    yield `**Total Issues = ${issues.length}**\n`;

    yield h2(`Issue Details`);
    yield `<details>\n<summary>📝</summary>\n`;
    yield '| Issue | Assignees | Labels | Last Updated | Repository |';
    yield '|---|---|---|---|---|';
    for (const issue of issues) {
        yield `${link(issue.title, issue.url)} | ${issue.assignees} | ${issue.labels} | ${issue.updatedAt} | ${issue.repo_nwo}`;
    }
    yield `</details>\n`;

    const owners = sumIssuesForOwners(issues);
    yield h2(`Assignees`);
    yield `<details>\n<summary>👨👩</summary>\n`;
    yield '| Assignee | Count |';
    yield '|---|---|';
    // Sort the table in descending order of issue count
    const ownersByIssueCount = Object.keys(owners).sort((a, b) => owners[b] - owners[a]);
    for (const key of ownersByIssueCount) {
        yield `${key} | ${owners[key]}`;
    }
    yield `</details>\n`;

    const labels = sumIssuesForLabels(issues);
    yield h2(`Labels`);
    yield `<details>\n<summary>🏷</summary>\n`;
    yield '| Label | Count |';
    yield '|---|---|';
    // Sort the table in descending order of issue count
    const labelsByIssueCount = Object.keys(labels).sort((a, b) => labels[b] - labels[a]);
    for (const key of labelsByIssueCount) {
        yield `${key} | ${labels[key]}`;
    }
    yield `</details>\n`;

    const repos = sumIssuesForRepos(issues);
    yield h2(`Repositories`);
    yield `<details>\n<summary>📒</summary>\n`;
    yield '| Repository | Count |';
    yield '|---|---|';
    // Sort the table in descending order of issue count
    const reposByIssueCount = Object.keys(repos).sort((a, b) => repos[b] - repos[a]);
    for (const key of reposByIssueCount) {
        yield `${key} | ${repos[key]}`;
    }
    yield `</details>\n`;

}

/** Get a mapping of IssueInfo field to the number of issues they have in this section. */
function sumIssuesForOwners(issues: IssueInfo[]) {
    const result: { [owner: string]: number } = {};

    for (const issue of issues) {
        if (issue.assignees.length > 0) {
            for (const login of issue.assignees) {
                if (!result[login]) {
                    result[login] = 0;
                }
                result[login] += 1
            }
        } else {
            if (!result[unassignedKey]) {
                result[unassignedKey] = 0;
            }
            result[unassignedKey] += 1
        }
    }

    return result;
}

function sumIssuesForLabels(issues: IssueInfo[]) {
    const result: { [label: string]: number } = {};

    for (const issue of issues) {
        if (issue.labels.length > 0) {
            for (const label of issue.labels) {
                if (!result[label]) {
                    result[label] = 0;
                }
                result[label] += 1
            }
        } else {
            if (!result[noLabelKey]) {
                result[noLabelKey] = 0;
            }
            result[noLabelKey] += 1
        }
    }

    return result;
}

function sumIssuesForRepos(issues: IssueInfo[]) {
    const result: { [repo: string]: number } = {};

    for (const issue of issues) {
        const repo = issue.repo_nwo;
        if (!result[repo]) {
            result[repo] = 0;
        }
        result[repo] += 1
    }

    return result;
}

// Note that this isn't a valid GitHub login, so it won't conflict with a potential owner.
// And yes, it is meant to be rendered as Markdown.
const unassignedKey = "**Unassigned**";
const noLabelKey = "**NoLabelAssigned**";

// Markdown helpers -- not the least bit safe for handling user input, so don't copy these for general use.
const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;
const link = (text: string, href: string) => `[${text}](${href})`;
