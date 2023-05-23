---
title: Neon GitHub Actions
subtitle: Use Neon's GitHub Actions to create and delete database branches
enableTableOfContents: true
isDraft: true
---

Neon provides the following GitHub Actions for working with database branches, which you can add to your CI workflows:

- [Create branch action](#create-branch-action)
- [Delete Branch action](#delete-branch-action)

## Create branch action

This GitHub Action creates a new branch in your Neon project.

<Admonition type="info">
The source code for this action is available on [GitHub](https://github.com/neondatabase/create-branch-action). You can also find this action on the [GitHub Action marketplace](https://github.com/marketplace/actions/neon-create-delete-branch).
</Admonition>

### Prerequisites

- To use this action, you require an Neon API key. For instructions, see [Create an API key](../manage/api-keys#create-an-api-key).
- Add your Neon API key to your GitHub Secrets. In your GitHub repository, go to **Settings** and locate **Secrets** at the bottom of the left side bar. Click **Actions** > **New Repository Secret**. Name the secret `NEON_API_KEY`, paste your API key in the **Secret** field, and click **Add Secret**.

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
- `parent_branch_id`: The ID of the parent branch, typically the `main` branch of your project. You can find this value in the Neon Console. Select **Branches** from the sidebar, and then select the branch. A branch ID has a `br-` prefix.
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
The source code for this action is available on [GitHub](https://github.com/neondatabase/delete-branch-action). You can also find this action on the [GitHub Action marketplace](https://github.com/marketplace/actions/neon-database-delete-branch).
</Admonition>

### Prerequisites

- To use this action, you require an Neon API key. For instructions, see [Create an API key](../manage/api-keys#create-an-api-key).
- Add your Neon API key to your GitHub Secrets. In your GitHub repository, go to **Settings** and locate **Secrets** at the bottom of the left side bar. Click **Actions** > **New Repository Secret**. Name the secret `NEON_API_KEY`, paste your API key in the **Secret** field, and click **Add Secret**.

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

- `project_id`: The ID of your Neon project. You can find this value in the Neon Console, on the **Settings** page.
- `branch_id`: The ID of the branch you want to delete. Select **Branches** from the sidebar, and then select the branch. A branch ID has a `br-` prefix.

### Outputs

This Action has no outputs.

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
