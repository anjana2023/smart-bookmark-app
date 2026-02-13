#  Smart Bookmark App

A real-time bookmark manager built using **Next.js App Router**, **Supabase**, and **Tailwind CSS**.

##  Live Demo

https://anjana-smart-bookmark-app.vercel.app/

## 📂 GitHub Repository

https://github.com/anjana2023/smart-bookmark-app

---

##  Features

- Google Authentication (No email/password)
- Add bookmarks (URL + title)
- Bookmarks are **private per user**
- Real-time updates using Supabase Realtime
- Delete bookmarks
- Fully deployed on Vercel

---

## 🛠 Tech Stack

- **Next.js 14 (App Router)**
- **Supabase (Auth, Database, Realtime)**
- **Tailwind CSS**
- **Vercel (Deployment)**

---

##  Problems Faced & How I Solved Them

### 1. Realtime updates not working for delete actions

**Problem:**  
Realtime updates worked for insert but not delete.

**Solution:**  
Updated Supabase realtime subscription to listen for all database events (`event: "*"`) and properly handled `payload.old` for delete actions.

---

### 2. Google authentication redirect error after deployment

**Problem:**  
Google login failed after deployment due to redirect mismatch.

**Solution:**  
Configured Supabase authentication redirect URLs to include the deployed Vercel domain.

---

### 3. Preventing users from seeing each other’s bookmarks

**Problem:**  
All users could access all bookmarks.

**Solution:**  
Implemented Supab
