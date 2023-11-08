---
title: AI Concepts
subtitle: Learn about embeddings and how they are used to build AI and LLM applications
enableTableOfContents: true
updatedOn: '2023-10-07T10:43:33.357Z'
---

Vector embeddings are an essential component of Generative AI applications. Embeddings encapsulate the meaning of text, enabling AI models to understand which texts are semantically similar. The process of extracting the most similar texts from your database based on a user's request is known as nearest neighbor or vector similarity search.

## pgvector

The `pgvector` extension enables vector similarity search in Postgres. It supports two index types:

- **IVFFlat**: Divides vectors into lists, and then searches a subset of those lists that are closest to the query vector.
- **Hierarchical Navigable Small World (HNSW)**: A graph-based index that makes vector search queries significantly faster.

But what does this mean for developers and Large Language Model (LLM) applications?

In this topic, we'll cover the following:

- [What are embeddings?](#what-are-embeddings)
- [What is vector similarity search?](#what-is-vector-similarity-search)
- Why do we use vector search for LLM apps
- How to optimize vector search

## What are embeddings?

In simple terms, a vector is a list of numbers that represent a point in space. For example, in 2D space, a vector [2,3] represents a point that’s 2 units along the x-axis and 3 units along the y-axis. In 3D space, a vector [2,3,4] adds an additional dimension, the z-axis. The beauty of vectors is that they can have many more dimensions than we can visualize. OpenAI's `text-embedding-ada-002 model`, for example, generates embeddings for 1536 dimensions.

The word “embedding” might sound complex, but it’s just a fancy way of saying “representation.” When we say “vector embedding,” we’re referring to a representation of complex data, like words or images, as vectors.

For example, consider the word “cat.” Instead of thinking about it as a string of letters, we can represent it as a point in a multi-dimensional space using a vector. Something like this:

```text
Cat: [0.8108,0.6671,0.5565,0.5449,0.4466]
```

This representation can capture the essence or meaning of the word "cat" in relation to other words. Words with similar meanings would be closer in dimensional space, while different meanings would be further way.

## Why use Vector Embeddings?

Vector embeddings allow us to convert diverse forms of data into a common format (vectors) that LLMs can understand and process. By doing so, we can perform mathematical operations on them, like calculating the distance between two vectors, which can tell us how similar or different two pieces of data are.

## What is vector similarity search?

The method of transforming data into embeddings and computing similarities between one or more items is referred to as vector search or similarity search.

Imagine you have a specific song stuck in your head, but you don’t know the title. Instead of listening to each song in a vast playlist, you’d want to find the one that closely matches the lyrics you remember. In the world of vectors, this is called “similarity search.”

When we represent data as vectors, we can measure how close or far apart these vectors are. Let’s assume we have the words apple, cat and dog represented by 5-dimension vector embeddings.

Apple: [−0.7888,−0.7361,−0.6208,−0.5134,−0.4044]
Cat: [0.8108,0.6671,0.5565,0.5449,0.4466]
Dog: [0.8308,0.6805,0.5598,0.5184,0.3940]

Now, we want to know which word is the closest semantically to the word "orange".

Orange: [−0.7715,−0.7300,−0.5986,−0.4908,−0.4454]

The "orange" vector is called the "query vector". We know that orange is a fruit, so logically it can be grouped with the word "apple". Let’s visualize our vectors on a two-dimensional plane. We can reduce the 5-dimensional vectors to 2-dimensional ones for visualization through [Principle Component Analysis](https://en.wikipedia.org/wiki/Principal_component_analysis).

![AI vector dimension graph](/docs/ai/ai_vector_dimension_graph)

You can se in the diagram above that there are two clusters: animals and fruit. The closer two vectors are, the more similar the data they represent is. So, to perform a similarity search, you need to calculate the distance between the query vector (orange) and all of the other vectors (cat, dog, apple) and find out which one is the smallest. Next, we’ll see how to calculate the distance between two vectors.

## Distance metrics

The concept of “distance” between vectors is pivotal in similarity search. There are various ways to measure distance, the most common being Euclidean distance. However, cosine similarity often proves more effective for high-dimensional data (like text or images).

### Eucledian or L2 distance

Euclidean distance, also known as L2 distance, is a measure of the straight-line distance between two points in Euclidean space. For two vectors A and B of length n, the L2 distance is calculated as follows:

![L2 distance formula](/docs/ai/l2_distance)

For example, let’s say we have two vectors `A=[1,2]` and `B=[2,2]`.

L2 Distance would be calculated as follows: `D(A,B)=(1-2)2+(2-2)2​=1`

For the L2 distance metric, the smaller the distance, the more similar A and B are. L2 performs well in use cases such as image recognition tasks where pixel-by-pixel differences are significant. However, unlike the cosine distance function, L2 distances are always positive, which makes them less suitable for understanding dissimilarities.

Here is what the distances would look like using L2:

```text
           |     Apple     |    Orange    |      Cat      |      Dog      |
---------------------------------------------------------------------------
Apple      |      0.0      |   0.054965   |   2.785305    |   2.779520    |
Orange     |   0.054965    |      0.0     |   2.767337    |   2.760769    |
Cat        |   2.785305    |   2.767337   |      0.0      |   0.063714    |
Dog        |   2.779520    |   2.760769   |   0.063714    |      0.0      |
```

### Cosine distance

Cosine distance is a measure of similarity derived from the cosine similarity metric. It’s often used for document retrieval use cases where the angle between vectors identifies the similarity in content.

While cosine similarity measures the cosine of the angle between two vectors, cosine distance is defined as the complement to cosine similarity, and is calculated as:

![cosine distance formula](/docs/ai/cosine_distance)

Cosine distance ranges from 0 to 2, where 0 indicates that the vectors are identical, and 2 indicates that they are diametrically opposed.

For example, for the same A=[1,2] and B=[2,2].

1. Calculate the Dot Product: `A⋅B=(1×2)+(2×2)=2+4=6`

2. Calculate the Magnitude: `A= 12+22​ =5​ , B= 22+22​ =8`​

3. Calculate the Cosine Distance: `D(A,B)=1− 65 8​ 0.0513`  

The matrix below shows the distances for our vectors:

```text
           |     Apple     |    Orange    |      Cat      |      Dog      |
---------------------------------------------------------------------------
Apple      |      0.0      |   0.000689   |   1.997025    |   1.997994    |
Orange     |   0.000689    |      0.0     |   1.997349    |   1.997192    |
Cat        |   1.997025    |   1.997349   |      0.0      |   0.001058    |
Dog        |   1.997994    |   1.997192   |   0.001058    |      0.0      |
```

## Vector search with pgvector

pgvector is the Postgres extension for vector similarity search. Let’s see how to execute our previous example using pgvector:

```sql
CREATE EXTENSION vector;
-- Creating the table
CREATE TABLE words (
    word VARCHAR(50) PRIMARY KEY,
    embedding VECTOR(5)
);

-- Inserting the vectors
INSERT INTO words (word, embedding) VALUES
('Apple', '[-0.7888, -0.7361, -0.6208, -0.5134, -0.4044]'),
('Cat', '[0.8108, 0.6671, 0.5565, 0.5449, 0.4466]'),
('Dog', '[0.8308, 0.6805, 0.5598, 0.5184, 0.3940]');
```

Here is an example of how to search vectors that are the closest to the word orange:

```sql
SELECT word FROM words
ORDER BY embedding <=> '[-0.7715, -0.7300, -0.5986, -0.4908, -0.4454]
```

Output:

```sql
word  
-------
 Apple
 Dog
 Cat
(3 rows)
```

The above query returns the list of `word` in the `words` table ordered by distance ascending order. The `<=>` operator is used for Cosine distances. The `pgvector` supports many distance functions, including Cosine, L2 and Inner Product.

The above query returns all rows in the table `words`. Typically in real-world applications, we want to return the k most similar vectors.

```sql
SELECT word FROM words
ORDER BY embedding <=> '[-0.7715, -0.7300, -0.5986, -0.4908, -0.4454] LIMIT 1;
```

Output:

```sql
word  
-------
 Apple
(1 row)
```

The query above performs a sequential scan and compares all vectors with the query vector and returns id’s for the closest vector to our query vector. This method can be computationally costly with large datasets. In the next section, we will see how to optimize the vector similarity search with indexes.

## Generating embeddings

A common approach to generate embeddings is to use OpenAI’s Embeddings API. This API allows you to input a text string into an API endpoint, which then returns the corresponding embedding. The "cow jumped over the moon" example above is a simplistic example with 3 dimensions. Most embedding models generate a much larger number of embeddings. OpenAI's `text-embedding-ada-002` model, for example, generates 1536 embeddings.

Here's an example of how to use OpenAI's `text-embedding-ada-002` model to generate an embedding:

```bash
curl https://api.openai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "Your text string goes here",
    "model": "text-embedding-ada-002"
  }'
```

<Admonition type="note">
Running the command above requires an OpenAI API key, which must be obtained from [OpenAI](https://platform.openai.com/).
</Admonition>

Upon successful execution, you'll receive a response similar to the following:

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.007009038,
        -0.0053659794,
        ...
        -0.00010458116,
        -0.024071306
      ]
    }
  ],
  "model": "text-embedding-ada-002-v2",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
```

To learn more about OpenAI's embeddings, see [Embeddings](https://platform.openai.com/docs/guides/embeddings).

## Storing vector embeddings in Postgres

Neon supports the [pgvector](/docs/extensions/pgvector) and [pg_embedding](/docs/extensions/pg_embedding) Postgres extensions, which enable storing and retrieving vector embeddings directly within your Postgres database. When building AI and LLM applications, installing either of these extensions eliminates the need to build out your architecture to include a separate vector store.

After installing an extension, you can create a table to store your embeddings. For example, if you install the `pgvector` extension, you might define a table similar to the following to store your embeddings:

```sql
CREATE TABLE items(id BIGSERIAL PRIMARY KEY, embedding VECTOR(1536));
```

To add embeddings to the table, you would insert the data as shown:

```sql
INSERT INTO items(embedding) VALUES ('[
    -0.006929283495992422,
    -0.005336422007530928,
    ...
    -4.547132266452536e-05,
    -0.024047505110502243
]');
```

## Building AI apps with embeddings

The concepts described above provide an introduction to the basic building blocks for developing an AI application with embeddings. You can see how they fit with the general process, which involves these steps:

1. Generate embeddings from your data
2. Store the embeddings in your database
3. Build an interface that prompts for user for input
4. Generate an embedding for the provided user input
5. Perform a similarity search that compares the embedding generated for the provided input against the embeddings stored in your database
6. Return the most similar data to the user

For example applications built based on this general process, see the following:

<DetailIconCards>
<a href="https://github.com/neondatabase/yc-idea-matcher" description="Build an AI-powered semantic search application" icon="github">Semantic search app</a>
<a href="https://github.com/neondatabase/ask-neon" description="Build an AI-powered chatbot with pgvector" icon="github">Chatbot app</a>
</DetailIconCards>
