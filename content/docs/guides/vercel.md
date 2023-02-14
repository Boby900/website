---
title: Add the Neon integration
enableTableOfContents: true
---

This guide describes how to connect Neon and Vercel by adding the [Neon integration from the Vercel marketplace](https://vercel.com/integrations/neon). The integration connects your Vercel project to a Neon database and enables creating a database branch for each preview deployment. Optionally, the integration also creates a development branch that you can use with your Vercel development environment.

<Admonition type="note">
This is a Beta version of Neon’s Vercel integration. For assistance or to suggest improvements, contact [vercel-feedback@neon.tech](mailto:vercel-feedback@neon.tech) or post in the [Neon community](https://community.neon.tech/).
</Admonition>

## Add the Neon integration

Prerequisites:

- A [Vercel account](https://vercel.com).
- A Vercel project. If you do not have one, see [Creating a project](https://vercel.com/docs/concepts/projects/overview#creating-a-project), in the _Vercel documentation_.
- The integration sets the `PGHOST`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`, and `DATABASE_URL` environment variables for your Vercel production, development, and preview environments. Ensure that these variables do not already exist in your Vercel project settings. For more information, see [Troubleshoot connection issues](#troubleshoot-connection-issues).

To add the integration:

1. Navigate to the [Neon Vercel integrations page](https://vercel.com/integrations/neon), and click **Add integration**.
![Add integration](/docs/guides/vercel_add_integration.png)
1. Select a Vercel account to add the integration to.
1. Select the Vercel project to add the integration to.
1. Review the permissions required by the integration, and click **Add Integration**.
1. In the **Integrate Neon** dialog:
    1. Select a Vercel project.
    ![Select a Vercel project](/docs/guides/vercel_select_project.png)
    1. Select the Neon project, database, and role that Vercel will use to connect. The Neon Free Tier supports a single project per user. If desired, you can create a new project, database, and role for the integration.
    ![Connect to Neon](/docs/guides/vercel_connect_neon.png)

        The database that you select must reside on the primary branch of your Neon project. This branch will be your production branch. It is preselected for you.

        You have the option to create a database branch for your Vercel development environment. Selecting this option creates a branch named `vercel-dev` and sets Vercel development environment variables for it. The `vercel-dev` branch is a copy-on-write clone of your production branch that you can modify without affecting your production branch.

        When you finish making selections, click **Continue**.
    1. Confirm the integration settings. This allows the integration to:

            - Reset the database user's password, enabling the integration to configure the environment variables that require a password.
            - Set environment variables for your Vercel project's production, development, and preview environments.
            - Create database branches for preview deployments.
            - Create a development branch for your Vercel development environment (if you selected that option).
    ![Confirm integration settings](/docs/guides/vercel_confirm_settings.png)

        Click **Connect** to confirm and proceed with the integration. If you encounter a connection error, see [Troubleshoot connection issues](#troubleshoot-connection-issues).

        Once the settings are configured, you are presented with a **Success!** dialog where you can copy the new password for your database user.
        ![Vercel integration success](/docs/guides/vercel_success.png)
    1. Click **Done** to complete the installation.
1. To view the results of the integration in Neon:
    1. Navigate to the [Neon Console](https://console.neon.tech/).
    1. Select the project you connected to.
    1. Select **Branches**.
    You will see the primary branch of your project. If you created a development branch, you will also see a `vercel-dev` branch.
1. To view the results of the integration in Vercel:
    1. Navigate to [Vercel](https://vercel.com/).
    1. Select the Vercel project you added the integration to.
    1. Select **Settings** > **Environment Variables**. You should see the `PGHOST`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`, and `DATABASE_URL` variable settings added by the integration.

## Troubleshoot connection issues

If the environment variables configured by the Neon integration already exist, you may encounter the following error due to an existing integration that sets one or more of the same environment variables.

    ```text
    Failed to set environment variables in Vercel. Please make sure that the following environment variables are not set: PGHOST, PGUSER, PGDATABASE, PGPASSWORD, DATABASE_URL
    ```

In this case, you can remove or rename the existing environment variables in your Vercel project settings and retry the Neon integration.

1. From the Vercel project page, select **Settings**.
1. Locate the environment variables required by the Neon integration and remove or rename  them.

    <Admonition type="note">
    Alternatively, you can remove the conflicting integration, assuming it no longer required. This may be a previous Neon integration or another integration. Removing the integration removes the variables set by the integration.
    </Admonition>

1. Try adding the Neon integration again. See [Add the Neon integration](#add-the-neon-integration).

## Manage your Neon integration

To view integration permissions, manage integration access, or remove the Neon integration:

1. On the Vercel dashboard, select **Settings** > **Integrations**.
1. Find the **Neon** integration and select **Manage**.
