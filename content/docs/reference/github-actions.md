---
title: Neon GitHub Actions
subtitle: Learn how to use the Neon's GitHub Actions
enableTableOfContents: true
isDraft: true
---

Neon provides the following GitHub Actions for working with database branches, which you can add to your CI workflows:

- [Create branch action](#create-branch-action)
- [Delete Branch action](#delete-branch-action)

## Create branch action

This GitHub Action to create new branches in your Neon project.

<Admonition type="info">
The source code for this action is available on [GitHub](https://github.com/neondatabase/create-branch-action). You can also find this action on the [GitHub Action marketplace](https://github.com/marketplace/actions/neon-create-delete-branch).
</Admonition>

### Prerequisites

To use this action, you require an Neon API key. For instructions, see [Create an API key](../manage/api-keys#create-an-api-key). Once you have the API ky, add it to your GitHub secrets. In your GitHub repo, go to Settings and and locate Secrets at the bottom of the left side bar. Click on Actions then on the New repository secret button to create a new secret. Name the secret NEON_API_KEY and paste the API key generated on the Neon console in the Secret field, then press Add secret button.

### Example

The following example creates a branch from the `main` branch in your Neon project when a pull request is opened. The new branch is named `from_action_reusable`.

```yaml
name: Create Neon Branch with GitHub Actions
run-name: Create a Neon Branch 🚀
jobs:
  create-branch:
    runs-on: ubuntu-latest
    steps:
      - uses: neondatabase/create-branch-action@main
        with:
          project_id: rapid-haze-373089
          parent_branch_id: br-long-forest-224191
          branch_name: from_action_reusable
          api_key: ${{ secrets.NEON_API_KEY }}
        id: create-branch
      - run: echo project_id ${{ steps.create-branch.outputs.project_id}}
      - run: echo branch_id ${{ steps.create-branch.outputs.branch_id}}
```

### Input variables

- `project_id`: The ID of your Neon project. You can find this value in the Neon Console, on the **Settings** page.
- `parent_branch_id`: The ID of the parent branch, typically the `main` branch of your project. You can find this value in the Neon Console. Select Branches from the sidebar, and then select the branch. A branch ID has a `br-` prefix.
- `branch_name`: The branch name is automatically set by the create branch action.

### Outputs

```yaml
outputs:
  branch_id:
    description: "Newly created branch Id"
    value: ${{ steps.output-branch-id.outputs.branch_id }}
  project_id:
    description: "Project Id"
    value: ${{ steps.output-project-id.outputs.project_id }}
```

- `branch_id`: The ID of the newly created branch.
- `project_id`: The ID of the parent branch.

## Delete branch action

This GitHub Action deletes a branch from your Neon project.

<Admonition type="info">
The source code for this action is available on [GitHub](https://github.com/neondatabase/delete-branch-action). You can also find this action on the [GitHub Action marketplace](https://github.com/marketplace/actions/neon-create-create-branch).
</Admonition>

### Prerequisites

To use this action, you require an Neon API key. For instructions, see [Create an API key](../manage/api-keys#create-an-api-key). Once you have the API ky, add it to your GitHub secrets. In your GitHub repo, go to Settings and and locate Secrets at the bottom of the left side bar. Click on Actions then on the New repository secret button to create a new secret. Name the secret NEON_API_KEY and paste the API key generated on the Neon console in the Secret field, then press Add secret button.

### Example

The following example deletes a branch with the `br-long-forest-224191` branch ID from a Neon project with the project ID `rapid-haze-373089` when a pull request is merged.

```yaml
name: Delete Neon Branch with GitHub Actions
run-name: Delete a Neon Branch 🚀
on: [push]
jobs:
  delete-neon-branch:
    uses: neondatabase/delete-branch-action.yml@beta
    with:
      project_id: rapid-haze-373089
      branch_id: br-long-forest-224191
      api_key: {{ secrets.NEON_API_KEY }}
```

### Input variables

- project_id: The ID of your Neon project. You can find this value in the Neon Console, on the **Settings** page.
- branch_id: The ID of the branch you want to delete. Select Branches from the sidebar, and then select the branch. A branch ID has a `br-` prefix.

### Outputs

This Action has no outputs.

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
