# Task Manager App

This is a simple Task Manager App built with Next.js that allows you to add, edit, delete, and mark tasks as completed. Tasks can also be dynamically sorted by priority (High, Medium, Low), and the app features server-side rendering using `getServerSideProps` for loading the initial list of tasks. The app uses a minimal UI design with responsiveness and basic styling.

Project Link: https://task-manager-app-two-ruddy.vercel.app

## Features

- **Add Task**: Add a task with a title, description, and priority (High, Medium, Low).
- **Edit Task**: Edit the title, description, or priority of existing tasks.
- **Delete Task**: Remove tasks from the list.
- **Mark as Completed**: Toggle tasks between completed and incomplete states.
- **Search**: Filter tasks by title or description.
- **Sort by Priority**: Tasks are dynamically sorted by priority, with High priority tasks at the top, followed by Medium, and then Low.
- **Responsive UI**: The app is fully responsive with basic styling using flexbox and CSS.
- **Server-Side Rendering**: Initial task list is loaded using Next.js' `getServerSideProps`.

## Approach for Sorting Tasks by Priority

The sorting of tasks by priority is handled dynamically in the application. Here's a brief explanation of how the sorting logic works:

1. **Priority Levels**:
   - Each task has a priority: `High`, `Medium`, or `Low`.
   - The priority levels are assigned a weight: `High` = 1, `Medium` = 2, `Low` = 3.

2. **Sorting Logic**:
   - The tasks are sorted based on these weights so that tasks with the highest priority appear first. The sorting is done using JavaScript’s `Array.prototype.sort()` function:
   ```javascript
   const sortedTasks = tasks.sort((a, b) => {
     const priorities = { high: 1, medium: 2, low: 3 };
     return priorities[a.priority] - priorities[b.priority];
   });
## Additional Features
1. Local Storage Persistence: The app uses localStorage to persist tasks across page reloads. If tasks are added, edited, or deleted, the task list is automatically updated in localStorage.
2. Search Bar: A simple search bar is provided to filter tasks by title or description, allowing you to quickly find tasks based on a keyword.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
