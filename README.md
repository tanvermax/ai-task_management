# 🧠 Task Management System with AI Integration

A modern task management app built with **Next.js 15**, **React 19**, **Tailwind CSS 4**, and **Gemini AI**, allowing users to manage their tasks and generate smart subtasks using AI.

---

## 🚀 Features

✅ **Add / Edit / Delete tasks**  
✅ Fields: `Title`, `Description`, `Status (Pending / Completed)`, `Due Date`  
✅ **Suggest Subtasks** — powered by Google **Gemini AI**  
✅ Clean, responsive UI with **Tailwind CSS 4**  
✅ Built with latest stable: **Next.js 15**, **React 19**, **TypeScript 5**

---
## 🚀 Challenges Faced

# Integrating Gemini in App Router: Next.js 15 uses App Router which required rewriting the traditional pages/api route into app/api/route.ts format.

# Gemini API formatting: The Gemini API expects a specific nested JSON body with contents → parts → text, which took time to debug.

# Tailwind upgrade to v4: Tailwind 4 introduced stricter PostCSS rules, requiring updated configuration.

# React 19 quirks: Early adoption of React 19 meant adjusting to stricter typing and use client directives.

## 🤖 AI-Powered Subtasks

Each task includes a `Suggest Subtasks` button that uses Gemini AI to generate 3–5 smaller actionable steps.

**Example**:

> **Task**: "Plan birthday party"  
> **AI Output**:
> - Book venue  
> - Send invitations  
> - Order cake  
> - Plan decorations  
> - Prepare playlist

---

## 🛠 Tech Stack

| Tech            | Version     |
|-----------------|-------------|
| Next.js         | 15.3.4      |
| React           | 19.0.0      |
| Tailwind CSS    | 4.x         |
| TypeScript      | 5.x         |
| Gemini API      | via REST    |
| Mongoose (Optional) | 8.16.1 |

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/my-gemini-app-2.git
cd my-gemini-app-2
npm install
npm run dev
