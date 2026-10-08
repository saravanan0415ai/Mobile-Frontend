"use client";

import { useState, useEffect } from "react";
import data from "../../data/data.json";

type User = {
  id: number;
  email: string;
  password: string;
  role: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    id: 0,
    email: "",
    password: "",
    role: "user",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.error("Failed to load users from backend");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.email || !form.password) return;

    if (editing) {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        }
      } catch (err) {
        console.error("Error updating user:", err);
      }
      setEditing(false);
    } else {
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const newUser = await res.json();
          setUsers([...users, newUser]);
        } else if (res.status === 409) {
          alert("User already exists!");
        }
      } catch (err) {
        console.error("Error adding user:", err);
      }
    }

    setForm({ id: 0, email: "", password: "", role: "user" });
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h2>User Management</h2>
        <p>Manage system users and roles</p>
      </div>

      {/* FORM */}
      <div className="card form-grid">
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSubmit}>
          {editing ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <div className="card table">
        <div className="row header">
          <span>Email</span>
          <span>Password</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p style={{ padding: 12 }}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={{ padding: 12 }}>No users found.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="row">
              <span>{u.email}</span>
              <span className="password">••••••••</span>
              <span className={`role ${u.role}`}>{u.role}</span>

              <div className="actions">
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .page {
          color: white;
        }

        .page-header {
          margin-bottom: 25px;
        }

        .page-header h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .page-header p {
          color: #94a3b8;
          font-size: 1rem;
        }

        /* 🧾 ADVANCED FORM GRID */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-grid input,
        .form-grid select {
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          transition: 0.3s;
        }

        .form-grid input:focus,
        .form-grid select:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .form-grid option {
          background: #1e1b4b;
          color: white;
        }

        .form-grid button {
          grid-column: span 2;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .form-grid button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        /* 📱 Mobile */
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-grid button {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}