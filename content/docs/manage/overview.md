---
title: Overview of the Neon object hierarchy
enableTableOfContents: true
isDraft: false
---
Managing your Neon project requires an understanding of the Neon object hierarchy. The following diagram shows how objects in Neon are related. See below for a description of of each object.

```text
Neon account
    |
    |- API keys
    | 
    |- project 
    |      |
    |      |---- primary branch (main) ---- compute endpoint a
    |                |    |
    |                |    |---- roles
    |                |    |---- databases           
    |                |                         
    |                |---- child branch 1 ---- compute endpoint b 
    |                |          |    |
    |                |          |    |---- roles
    |                |          |    |---- databases   
    |                |          |
    |                |          |---- child branch 1.a ---- compute endpoint c 
    |                |                          |
    |                |                          |---- roles
    |                |                          |---- databases
    |                |
    |                |---- child branch 2 
    |                                |
    |                                |---- roles
    |                                |---- databases
```

## Neon account

This is the account you used to sign up with Neon. Neon currently supports signing up with GitHub, Google, or partner accounts.

## API keys

API keys are global and belong to the Neon account. API keys are used with the [Neon API](https://api-docs.neon.tech/reference/getting-started-with-neon-api) to create and manage Neon projects or objects within a Neon project. A Neon account can create unlimited API keys. For more information, see [Manage API keys](../manage/api-keys).

## Projects

A project is the top-level object in the Neon object hierarchy. It is a container for all other objects, with the exception of API keys, which are global. Branches and compute endpoints belong to a project. A Neon project defines the region where project resources reside. A Neon account can have multiple projects, but tier limits define the number of projects per Neon account. For more information, see [Manage projects](../manage/projects).

## Branches

Data resides in a branch. Each Neon project is created with a primary branch called `main`. You can create child branches from `main` or from previously created branches. A branch can contain multiple databases and roles. Tier limits define the number of branches you can create in a project and the amount of data per branch. For more information, see [Manage branches](../manage/branches).

## Compute endpoint

A compute endpoint is a compute resource associated with a branch. A read-write compute endpoint is created for a project's primary branch, by default. You can choose whether or not to create a compute endpoint when creating a branch. To connect to a database that resides in a branch, you must connect via a compute endpoint that is associated with the branch. Tier limits define the resources (vCPUs and RAM) available to a compute endpoint. For more information, see [Manage computes](../manage/endpoints).

## Roles

In Neon, roles are PostgreSQL roles. A role is required to create and access a database. A role belongs to a branch. There is no limit on the number of roles you can create. The primary branch of a Neon project is created with a role named for the Neon account that you registered with. For example, if you registered with a Google account for "Casey Smith", Neon creates a role named "Casey" in the primary branch. This role is the owner of the default `neondb` database in your project's primary branch. For more information, see [Manage roles](../manage/roles).

## Databases

As with any standalone instance of PostgreSQL, a database is a container for SQL objects such as schemas, tables, views, functions, and indexes. In Neon, a database belongs to a branch. The primary branch of a Neon project is created with a default database named `neondb`. There is no limit on the number of databases you can create. For more information, see [Manage databases](../manage/databases).
