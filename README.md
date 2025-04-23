**🧠 Quiz Builder App**

**📌 Overview**
A fun, full-stack quiz builder app built using Node.js, Express.js, Vue.js, and MongoDB. 
It enables admins to create quizzes with timed questions, generate unique shareable links, and collect responses tied to email addresses.

**🚀 Features**
  ✍️ Create Custom Quizzes
    Add title, description, and questions
    🕒 Set a timer for each question (optional)
  
  🔐 Admin Authentication
    Uses bcrypt for secure password hashing
    JWT for session handling
  
  🔗 Unique URLs for Each Quiz
    Public users access quizzes via unique links
    Responses are tied to email addresses (1 response per user)

  📊 Response Tracking
    Stores answers with timestamps and email IDs
  
  💻 Easy Local Setup
    Fully cloneable and locally deployable

**TECH STACK**
  Frontend | Vue.js
  Backend | Node.js + Express.js
  Database | MongoDB
  Auth | bcrypt + JWT
