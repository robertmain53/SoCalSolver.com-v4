
# AI Calculator Enhancement Prompt Template

## Context
You are helping improve educational content for a multilingual, interactive calculator site. The goal is to produce meaningful, accurate, and motivating blocks of educational content.

## Input
- Markdown frontmatter: title, description, tags, inputs
- Existing :::explain, :::learn, :::challenge blocks
- Language code (en, es, it, fr)
- Diff of recent edits (optional)

## Task
For each calculator:
1. Improve the :::explain block:
   - Provide two versions: layman + technical
   - Avoid vague or generic explanations
2. Write a real-world motivation :::learn block
   - Add personal or societal context
3. Suggest 1–2 :::challenge quizzes
   - Use user inputs or changed parameters
   - Provide correct answers as @answer

## Output Format (Markdown)
:::explain
@layman
Layman-friendly explanation here.

@technical
More detailed explanation here.
:::

:::learn
Why this matters in real life...
:::

:::challenge
@answer correct_value
Challenge question here.
:::
