import { useEffect, useState } from 'react';
import './App.css';

type Workout = {
  id: number;
  exercise: string;
  duration: number;
  date: string;
  sets: number;
  reps: number;
  distance: number;
};

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const saved = localStorage.getItem('fitness-workouts');
      return saved ? (JSON.parse(saved) as Workout[]) : [];
    } catch {
      return [];
    }
  });

  const [exercise, setExercise] = useState('Running');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(getToday());
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [distance, setDistance] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>(
    'success',
  );

  useEffect(() => {
    localStorage.setItem('fitness-workouts', JSON.stringify(workouts));
  }, [workouts]);

  const todayWorkouts = workouts.filter(
    (workout) => workout.date === getToday(),
  );

  const todayMinutes = todayWorkouts.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );

  const currentTime = new Date();
  const weekStart = new Date(currentTime);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - 6);

  const weeklyWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(`${workout.date}T00:00:00`);
    return workoutDate >= weekStart && workoutDate <= currentTime;
  });

  const weeklyMinutes = weeklyWorkouts.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const durationValue = Number(duration);
    const setsValue = sets === '' ? 0 : Number(sets);
    const repsValue = reps === '' ? 0 : Number(reps);
    const distanceValue = distance === '' ? 0 : Number(distance);

    if (!duration || !Number.isFinite(durationValue) || durationValue <= 0) {
      showMessage('Please enter a duration greater than zero.', 'error');
      return;
    }

    if (!date || date > getToday()) {
      showMessage('Please select a valid date that is not in the future.', 'error');
      return;
    }

    if (
      (sets !== '' && (!Number.isInteger(setsValue) || setsValue <= 0)) ||
      (reps !== '' && (!Number.isInteger(repsValue) || repsValue <= 0))
    ) {
      showMessage('Sets and reps must be positive whole numbers.', 'error');
      return;
    }

    if (
      distanceValue < 0 ||
      !Number.isFinite(distanceValue)
    ) {
      showMessage('Distance cannot be negative.', 'error');
      return;
    }

    const newWorkout: Workout = {
      id: Date.now(),
      exercise,
      duration: durationValue,
      date,
      sets: setsValue,
      reps: repsValue,
      distance: distanceValue,
    };

    setWorkouts((previous) => [...previous, newWorkout]);
    setDuration('');
    setSets('');
    setReps('');
    setDistance('');
    setDate(getToday());

    showMessage('Workout saved successfully! Keep going! 💪', 'success');
  }

  function showMessage(
    text: string,
    type: 'success' | 'error',
  ) {
    setMessage(text);
    setMessageType(type);
  }

  function deleteWorkout(id: number) {
    setWorkouts((previous) => previous.filter((workout) => workout.id !== id));
    showMessage('Workout deleted.', 'success');
  }

  const sortedWorkouts = [...workouts].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id,
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <a href="#dashboard" className="brand">
          <span className="brand-icon">💪</span>
          <span>FitTrack</span>
        </a>

        <p className="sidebar-label">MENU</p>

        <nav className="navigation">
          <a href="#dashboard" className="nav-link active">
            <span>▦</span> Dashboard
          </a>
          <a href="#add-workout" className="nav-link">
            <span>＋</span> Add Workout
          </a>
          <a href="#history" className="nav-link">
            <span>▤</span> Workout History
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-emoji">🏆</div>
          <h3>Keep going!</h3>
          <p>Every little effort makes you stronger.</p>
        </div>

        <p className="sidebar-footer">FITTRACK · YOUR JOURNEY</p>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR FITNESS JOURNEY</p>
            <h1>Good day, Champion! <span>👋</span></h1>
            <p className="subtitle">
              Small steps today, stronger results tomorrow.
            </p>
          </div>

          <div className="profile-badge">🏃</div>
        </header>

        <section className="welcome-banner">
          <div className="banner-content">
            <p className="banner-label">YOUR DAILY MOTIVATION</p>
            <h2>Progress, not perfection.</h2>
            <p>Every workout is a step toward a healthier you.</p>
            <a className="banner-button" href="#add-workout">
              Start a workout <span>→</span>
            </a>
          </div>

          <div className="banner-art" aria-hidden="true">
            <span>🏋️</span>
            <span className="art-circle circle-one" />
            <span className="art-circle circle-two" />
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon purple">◷</span>
              <span className="stat-tag">TODAY</span>
            </div>
            <p className="stat-label">Workout Duration</p>
            <h2>{todayMinutes}<span> min</span></h2>
            <p className="stat-note">Total active minutes today</p>
            <div className="stat-line purple-line" />
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon green">✓</span>
              <span className="stat-tag">TODAY</span>
            </div>
            <p className="stat-label">Workout Sessions</p>
            <h2>{todayWorkouts.length}</h2>
            <p className="stat-note">Activities logged today</p>
            <div className="stat-line green-line" />
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span className="stat-icon orange">↗</span>
              <span className="stat-tag">7 DAYS</span>
            </div>
            <p className="stat-label">Weekly Duration</p>
            <h2>{weeklyMinutes}<span> min</span></h2>
            <p className="stat-note">
              {weeklyWorkouts.length} workout sessions
            </p>
            <div className="stat-line orange-line" />
          </article>
        </section>

        <section className="content-grid">
          <article className="panel" id="add-workout">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">BUILD YOUR ROUTINE</p>
                <h2>Log a Workout</h2>
              </div>
              <span className="heading-icon">✍️</span>
            </div>

            <p className="panel-description">
              Enter your workout details to record your progress.
            </p>

            <form className="workout-form" onSubmit={handleSubmit}>
              <label>
                Exercise Type
                <select
                  value={exercise}
                  onChange={(event) => setExercise(event.target.value)}
                >
                  <option>Running</option>
                  <option>Walking</option>
                  <option>Cycling</option>
                  <option>Swimming</option>
                  <option>Weight Training</option>
                  <option>Yoga</option>
                  <option>Push-ups</option>
                  <option>Other</option>
                </select>
              </label>

              <div className="form-row">
                <label>
                  Duration (minutes) *
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="e.g. 30"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                  />
                </label>

                <label>
                  Workout Date *
                  <input
                    type="date"
                    required
                    max={getToday()}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Sets (optional)
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 3"
                    value={sets}
                    onChange={(event) => setSets(event.target.value)}
                  />
                </label>

                <label>
                  Repetitions (optional)
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 12"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                  />
                </label>
              </div>

              <label>
                Distance in kilometers (optional)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 5"
                  value={distance}
                  onChange={(event) => setDistance(event.target.value)}
                />
              </label>

              {message && (
                <div className={`form-message ${messageType}`} role="status">
                  {message}
                </div>
              )}

              <button type="submit" className="submit-button">
                <span>＋</span> Save Workout
              </button>
            </form>
          </article>

          <article className="panel" id="history">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">YOUR ACHIEVEMENTS</p>
                <h2>Workout History</h2>
              </div>
              <span className="heading-icon">📅</span>
            </div>

            <p className="panel-description">
              Your recorded workouts, newest first.
            </p>

            {sortedWorkouts.length === 0 ? (
              <div className="empty-history">
                <div className="empty-illustration">📋</div>
                <h3>No workouts yet</h3>
                <p>Your activities will appear here after you save them.</p>
                <a href="#add-workout">Log your first workout →</a>
              </div>
            ) : (
              <div className="workout-list">
                {sortedWorkouts.map((workout) => (
                  <div className="workout-item" key={workout.id}>
                    <div className="workout-type-icon">🏃</div>
                    <div className="workout-details">
                      <h3>{workout.exercise}</h3>
                      <p>{workout.date} · {workout.duration} minutes</p>
                      <div className="workout-meta">
                        {workout.sets > 0 && <span>{workout.sets} sets</span>}
                        {workout.reps > 0 && <span>{workout.reps} reps</span>}
                        {workout.distance > 0 && (
                          <span>{workout.distance} km</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteWorkout(workout.id)}
                      aria-label={`Delete ${workout.exercise} workout`}
                      title="Delete workout"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>

        <footer className="page-footer">
          <span>💚 Made for a healthier you.</span>
          <span>One day at a time.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;