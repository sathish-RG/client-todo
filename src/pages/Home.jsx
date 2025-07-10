import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../redux/features/task/taskSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [taskText, setTaskText] = useState('');
  const { items: tasks, status, error } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    dispatch(fetchTasks());
  }, [dispatch, user, navigate]);

  const handleAddTask = async () => {
    if (!taskText.trim()) return;
    try {
      await dispatch(
        addTask({
          title: taskText.trim(),
          userId: user._id,
        })
      ).unwrap();
      setTaskText('');
    } catch (err) {
      console.error('Add Task Error:', err);
    }
  };

  const handleToggleCheckbox = async (task) => {
    try {
      await dispatch(
        updateTask({
          id: task._id,
          taskData: {
            title: task.title,
            description: task.description || '',
            status: task.status || 'active',
            completed: !task.completed,
          },
        })
      ).unwrap();
    } catch (err) {
      console.error('Checkbox Toggle Error:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch (err) {
      console.error('Delete Task Error:', err);
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>

      <div className="flex justify-center gap-3 mb-8">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          className="w-full h-10 border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-600 p-2 rounded w-20 text-white hover:bg-green-700 disabled:bg-gray-400"
          disabled={!taskText.trim()}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No tasks found. Add your first task!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`flex items-center justify-between p-3 border rounded ${
                task.completed ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => handleToggleCheckbox(task)}
                  className="mr-3 h-5 w-5"
                />
                <span
                  className={`text-lg ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
