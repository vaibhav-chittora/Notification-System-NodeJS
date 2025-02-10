# Notification & Alert System

## 📌 Project Overview

This is a **distributed notification and alert system** that manages and delivers notifications based on user preferences and rules. It supports:

- **Real-time notifications**
- **Scheduled notifications**
- **User-defined quiet hours**
- **Throttling limits**
- **Multiple channels (Email & Push Notifications)**
- **Deduplication of similar alerts**
- **Batching of low-priority notifications**

## 🛠 Tech Stack

- **Backend:** Node.js (Express.js)
- **Database:** MongoDB Atlas
- **Queue Processing:** Redis + Bull
- **WebSockets:** Socket.io
- **Email Notifications:** Nodemailer
- **Message Deduplication & Scheduling:** MongoDB & Bull

## ✨ Features Implemented

### ✅ Core Features

- **Notification Ingestion API** (`POST /api/notifications`)
- **Real-time WebSocket Notifications**
- **Scheduled Notifications Processing**
- **Throttling (Max 3 notifications per hour per user)**
- **Quiet Hours Handling (Reschedules notifications if needed)**
- **Deduplication (Avoids duplicate alerts within 1 hour)**
- **Batching Low-Priority Notifications (Combines similar messages)**
- **Analytics API** (`GET /api/analytics` - Tracks sent, failed notifications, and average delivery time)

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-repo/notification-system.git

cd notification-system
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the project root and add:

```
PORT=3000
DB_URL=your_mongodb_atlas_url
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

### **4️⃣ Start Redis Server**

```sh
redis-server
```

### **5️⃣ Start Backend Server**

```sh
node src/server.js
```

## 🔥 API Documentation

### **1️⃣ Create a Notification**

**Endpoint:** `POST /api/notifications`

```json
{
  "userId": "65a12b3c45d67e001b2c3456",
  "message": "Hello, this is a test notification!",
  "type": "email",
  "priority": "high"
}
```

### **2️⃣ Get Analytics Data**

**Endpoint:** `GET - /api/analytics`

### **3️⃣ WebSocket Connection (Push Notifications)**

- **Connect to WebSocket Server:** `ws://localhost:3000`
- **Listen for new notifications:**

```js
socket.on("newNotification", (data) => {
  console.log("📢 New Notification:", data.message);
});
```

## 🧪 Testing Instructions

### **1️⃣ Start All Services**

```sh
redis-server

node src/server.js
```

### **2️⃣ Test with Postman**

- **Create Notification (`POST - /api/notifications`)** ✅
- **Test Throttling (Try sending 4 notifications within 1 hour)** ✅
- **Check Quiet Hours (Send notification in restricted hours)** ✅
- **Test Deduplication (Send same message twice within 1 hour)** ✅
- **Validate Scheduled Notifications (Set `sendAt` to future time)** ✅
- **Check WebSocket Push Notifications** ✅

### **3️⃣ Check MongoDB Atlas**

- **Notifications should update from `pending` → `sent` after processing**

### **4️⃣ Test WebSocket in Postman**

1. Open **Postman WebSocket Client**
2. Connect to `ws://localhost:3000`
3. Send a notification (`POST /api/notifications`)
4. Check if WebSocket receives real-time notification

## 🔮 Future Enhancements

- **SMS Notifications (Twilio Integration)**
- **Admin Dashboard for Monitoring Analytics**
- **Priority-Based Delivery Optimization**
- **Failover Mechanism for Failed Deliveries**

## 👨‍💻 Contributors

- **Vaibhav Chittora** - Backend Developer

<!-- ## 📜 License

This project is licensed under the MIT License.

---

🎯 **Project is now fully functional & ready for deployment!** 🚀 -->
