export interface ProjectInfo {
    projectType: string,
    projectNumber: number,
    projectOwner: string //will be GitHub org or repo nwo
}

export interface IssueInfo {
    title: string,
    url: string,
    repo_nwo: string
    state: string,
    createdAt: Date,
    updatedAt: Date,
    assignees: string [],
    labels: string []
}

