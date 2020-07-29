import * as core from '@actions/core';

import * as projectSummary from './project-summary';

async function main(): Promise<void> {
    try {
        await projectSummary.run({
          projectUrl: core.getInput('project-url'),
          title: core.getInput('title'),
          outputPath: core.getInput('outputPath'),
          token: core.getInput('token')
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));