import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [date, setDate] = useState('')  
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('student-planner-tasks')

  if (savedTasks !== null) {
    try {
      return JSON.parse(savedTasks)
    } catch {
      localStorage.removeItem('student-planner-tasks')
    }
  }

  return [
    {
      id: 1,
      title: 'Study JavaScript',
      course: 'COMP100',
      date: '2026-10-18',
      completed: false,
    },
    {
      id: 2,
      title: 'Prepare project report',
      course: 'Web Development',
      date: '2026-10-20',
      completed: false,
    },
    {
      id: 3,
      title: 'Complete English homework',
      course: 'English',
      date: '2026-10-22',
      completed: true,
    },
  ]
})
useEffect(() => {
  localStorage.setItem(
    'student-planner-tasks',
    JSON.stringify(tasks)
  )
}, [tasks])
function handleAddTask(event) {
  event.preventDefault()

  if (!title.trim() || !course.trim() || !date) {
    alert('Please fill in all fields.')
    return
  }

  if (editingTaskId !== null) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: title.trim(),
              course: course.trim(),
              date,
            }
          : task
      )
    )

    setEditingTaskId(null)
  } else {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      course: course.trim(),
      date,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  setTitle('')
  setCourse('')
  setDate('')
}

function handleToggleTask(taskId) {
  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    )
  )
}
function handleEditTask(task) {
  setTitle(task.title)
  setCourse(task.course)
  setDate(task.date)
  setEditingTaskId(task.id)
}
function handleDeleteTask(taskId) {
  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== taskId)
  )
}
return ( <div className="app"> <header className="header"> <div className="brand"> <div className="brand-icon">S</div> <span>Student Planner</span> </div>


    <span className="header-label">MY STUDY SPACE</span>
  </header>

  <main className="main">
    <section className="welcome">
      <p className="eyebrow">YOUR PERSONAL STUDY ASSISTANT</p>
      <h1>Plan your studies.<br />Achieve your goals.</h1>
      <p className="welcome-text">
        Keep your courses and assignments organized in one place.
      </p>
    </section>

    <section className="stats">
      <div className="stat-card">
        <span className="stat-label">Total Tasks</span>
        <span className="stat-number">{tasks.length}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <span className="stat-number">
          {tasks.filter((task) => task.completed).length}
        </span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Remaining</span>
        <span className="stat-number">
          {tasks.filter((task) => !task.completed).length}
        </span>
      </div>
    </section>
    <section className="add-task-section">
      <h2>Add a new task</h2>

      <form onSubmit={handleAddTask}>
        <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
      type="text"
      placeholder="Course name"
      value={course}
      onChange={(event) => setCourse(event.target.value)}
      />
      <input
      type="date"
      value={date}
      onChange={(event) => setDate(event.target.value)}
      />

      <button type="submit">
        {editingTaskId !== null ? 'Update Task' : 'Add Task'}
      </button>
      </form>
    </section>
    <section className="tasks-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">STAY ON TRACK</p>
          <h2>My assignments</h2>
        </div>

        <span className="task-count">{tasks.length} tasks</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <button
              type="button"
              className={`task-status ${task.completed ? 'is-completed' : ''}`}
              onClick={() => handleToggleTask(task.id)}
              aria-label={
              task.completed
              ? 'Mark task as incomplete'
              : 'Mark task as completed'
              }
              >
              {task.completed ? '✓' : '○'}
            </button>

            <div className="task-info">
              <h3 className={task.completed ? 'completed' : ''}>
                {task.title}
              </h3>
              <p>{task.course}</p>
            </div>

            <time className="task-date">{task.date}</time>

            <span
              className={`status-badge ${
                task.completed ? 'done' : 'pending'
              }`}
            >
              {task.completed ? 'Completed' : 'In progress'}
            </span>
            <div className="task-actions">
            <button
              type="button"
              className="edit-button"
              onClick={() => handleEditTask(task)}
            >
              Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
          </article>
        ))}
      </div>
    </section>

    <footer className="footer">
      Student Planner <span>•</span> Organize your academic life.
    </footer>
  </main>
</div>


)
}

export default App
