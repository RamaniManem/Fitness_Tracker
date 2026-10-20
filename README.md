# 💪 FitTrack — Fitness Tracker

FitTrack is a responsive fitness tracking application that helps users
record their workouts, monitor daily activity, and review their workout
history through a clean and user-friendly dashboard.

The application is built with React, TypeScript, and Vite. It uses browser
Local Storage to retain workout records between sessions.

## ✨ Features

- Add workouts by selecting an exercise type.
- Record workout duration and date.
- Optionally record sets, repetitions, and distance.
- Validate workout inputs before saving.
- View total workout duration for the current day.
- Track the number of workout sessions completed today.
- View total workout duration and sessions over the last seven days.
- View workout history in reverse chronological order.
- Delete workout records.
- Automatically update dashboard metrics when workouts are added or deleted.
- Store workout records in browser Local Storage.
- Responsive interface for desktop, tablet, and mobile screens.

## 🛠️ Technologies Used

- React
- TypeScript
- Vite
- CSS3
- Browser Local Storage

## 📋 Prerequisites

Install the following before running the project:

- Node.js
- npm
- Visual Studio Code (recommended)

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

📈 Metric Calculation Logic
Today's Workout Duration
The sum of the durations of all workouts recorded for the current date.

Formula:

Today's Duration = Sum of durations for today's workouts.
Today's Workout Sessions
The number of workout records whose date matches the current date.

Formula:

Today's Sessions = Count of today's workout records.
Weekly Workout Duration
The sum of workout durations recorded during the last seven calendar days, including today.

Formula:

Weekly Duration = Sum of durations for workouts dated within the last seven days.
Weekly Workout Sessions
The number of workout records dated within the last seven days, including today.

Formula:

Weekly Sessions = Count of workout records within the last seven days.
Workout History
Workout records are displayed in descending date order, with newer workouts appearing first.
Data Persistence
Workout records are saved in browser Local Storage under the key:

fitness-workouts

The data remains available after refreshing the browser in the same browser profile, provided the stored data has not been cleared.

✅ Validation
The application validates workout entries to ensure:
- Workout duration is greater than zero.
- A workout date is provided and is not in the future.
- Sets and repetitions, when entered, are positive whole numbers.
- Distance cannot be negative.

🧪 Testing Checklist
- [ ] Add a new workout.
- [ ] Verify today's duration updates.
- [ ] Verify today's session count updates.
- [ ] Verify weekly metrics update.
- [ ] Delete a workout.
- [ ] Verify metrics update after deletion.
- [ ] Refresh the browser and verify persistence.
- [ ] Test invalid workout inputs.
- [ ] Check the dashboard on a narrow screen.

🔒 Privacy and Storage
FitTrack stores workout records in the browser's Local Storage.

The current implementation does not require a user account or a remote database. Workout records are specific to the browser profile and origin used to access the application.

🔮 Future Improvements
- Workout editing.
- Exercise-specific statistics.
- Charts showing weekly progress.
- Personal fitness goals.
- Calorie-burn estimates.
- Export workout history to CSV.
- Optional cloud synchronization.

👩‍💻 Development
This project was developed as an application development task focused on
form handling, metric dashboards, validation, and local data persistence.
