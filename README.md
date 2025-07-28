# 🎓 ClassCapsule - Smart Academic Management Web App

![Angular](https://img.shields.io/badge/Angular-v20-red.svg)
![Status](https://img.shields.io/badge/status-Under%20Development-yellow.svg)

---

## 🧠 Overview

*ClassCapsule* is a web application built using *Angular*. It aims to simplify and organize academic life for students, teachers, administrators, and alumni. The app allows users to manage assignments, view schedules, check reports, and perform essential academic tasks from one platform.

The app is currently under development and already includes several useful features like a dashboard, calendar, reports, assignments, and user authentication. In the future, we plan to add a separate section for *alumni* where they can connect with students and the administration. This platform is meant to help everyone in an educational institution stay connected, informed, and updated.

---

## 👥 Team Members

This project was created by:

- *Prachi Shaw*
- *Amit Pandey*
- *Sayak Ghosh*

We worked together on all the parts of the project, including design, frontend development, routing, and user interface.

---

## 📷 Screenshots

### Dashboard
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/a335a66c-a22a-4858-833a-e4e824a99fc1" />

### My Courses
<img width="1917" height="916" alt="image" src="https://github.com/user-attachments/assets/16d123f7-5682-4d91-a39b-f4ce087d7bb0" />

### Calendar View
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/5f43b6a0-eca2-4945-ba4c-710b45ab64fa" />

### Responsive View
<img width="806" height="1600" alt="image" src="https://github.com/user-attachments/assets/a2166b5b-b82e-4741-a4bc-7a945947ec91" />

---

## 🚀 Features

### 🔐 Login and Roles
The app has a login system where different users can log in based on their role:
- *Student* – can view assignments and calendar
- *Teacher* – can post assignments and check reports
- *Admin* – can manage users and system data

Each role sees a different dashboard with options made just for them.

---

### 🌓 Light and Dark Mode
The app supports both *light* and *dark* themes. You can switch between them using a toggle on the sidebar. The theme helps reduce eye strain and improves the user experience based on personal preference.

---

### 🧭 Sidebar Navigation
The app has a clean sidebar for easy navigation. It includes links to:
- Dashboard
- Assignments
- Courses
- Calendar
- Reports
- Login/Register

The sidebar is responsive and works well on both desktop and mobile.

---

### 📅 Calendar
The calendar helps users keep track of important dates like:
- Assignment deadlines
- Scheduled classes
- Events or tasks

In the future, we plan to allow users to sync it with personal calendars or set reminders.

---

### 📝 Assignments
Teachers can create and post assignments. Students can view them based on their schedule. This feature helps organize course work and manage time better.

---

### 📊 Reports
Reports help track what students are doing. Teachers and admins can see:
- Assignment status
- Student activity
- Overall progress

This makes it easy to follow academic performance.

---

## 🧱 Technologies Used

| Technology       | Use                                  |
|------------------|--------------------------------------|
| Angular 20+      | Frontend framework                   |
| Angular Material | UI components like buttons, forms    |
| TypeScript       | Logic and interactivity              |
| HTML/CSS         | Layout and styles                    |
| SCSS             | Theming (light/dark mode)            |

All the pages and components are made with Angular, and we used *Angular Material icons and forms* to make everything look modern and easy to use.

---

## 🛠 Current Components

The app includes these main components:
- *Login/Register Pages*
- *Dashboard*
- *Sidebar*
- *Assignments*
- *Courses*
- *Reports*
- *Calendar*

These components are reusable and connected through Angular's routing system. Each page is linked properly so users can move easily between them.

---

## 📈 Future Plans

We plan to continue adding features to make the app more powerful and helpful.

### 🔮 Coming Soon:
- *Alumni Section*: Alumni can register and connect with current students and administrators.
- *Notifications*: Users will receive updates for deadlines and events.
- *Better Reports*: More detailed analytics for admin and teachers.
- *Profile Settings*: Users can update personal information and customize the app.

---

## 🧪 Testing and Performance

We have tested the app on multiple browsers and screen sizes to ensure it works well everywhere. It loads fast, and the components adjust automatically based on the user's screen.

The app is easy to maintain and update because it uses modular code. Each feature is in its own folder, making it simple to fix bugs or add new tools.

---

## 🎯 Goal of the Project

The main aim of *ClassCapsule* is to bring students, teachers, admins, and alumni onto one platform. We want to:
- Make learning and teaching easier
- Keep everything organized and in one place
- Improve communication between all users

The app is made to help institutions manage their academic workflow in a simple and user-friendly way.

---

## 🏁 How to Run Locally

To run the app on your own machine:

```bash
# Clone the repository
git clone https://github.com/prachishaw/ClassCapsule.git
cd ClassCapsule

# Install dependencies
npm install

# Run the Angular app
ng serve
