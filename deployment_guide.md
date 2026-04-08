# 🚀 Deployment Guide: Render.com

I've added a `render.yaml` file to your repository which makes deployment very simple. Follow these steps to take your API live.

---

## Step 1: Log in to Render
1.  Go to **[dashboard.render.com](https://dashboard.render.com)**.
2.  Sign in with your **GitHub** account.

---

## Step 2: Create a New Web Service
1.  Click the blue **"New +"** button and select **"Web Service"**.
2.  Connect your GitHub repository: `Sharkyyyx28/School-Management-Api`.
3.  Render will automatically detect the `render.yaml` file and use the preset settings.

---

## Step 3: Configure Environment Variables
You MUST add the Railway database credentials so the live app can connect to your database.

1.  In the Render setup page, find the **"Environment Variables"** section.
2.  Add the following keys and copy the values from your Railway dashboard:

| Key | Value (Copy from Railway) |
| :--- | :--- |
| **`DB_HOST`** | `mainline.proxy.rlwy.net` |
| **`DB_USER`** | `root` |
| **`DB_PASSWORD`** | `qyJVUEAAllWUSLkSsiQtGEkAQpoGraDQ` |
| **`DB_NAME`** | `railway` |
| **`DB_PORT`** | `53318` |

---

## Step 4: Deploy!
1.  Click **"Create Web Service"**.
2.  Render will start building and deploying your app.
3.  Once finished, you will see a URL like `https://school-management-api-xxxx.onrender.com`.

---

## ✅ Post-Deployment Check
Once the app is live, test it using the public URL:
1.  **Health Check**: `https://your-app.onrender.com/`
2.  **Add School**: `POST https://your-app.onrender.com/addSchool`
3.  **List Schools**: `GET https://your-app.onrender.com/listSchools?latitude=28.6&longitude=77.2`
