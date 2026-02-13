import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import userService from '../../services/userService';
import authService from '../../services/authService';

const UserManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const currentUser = authService.getCurrentUser();
    const isAdmin = currentUser?.role === 'ADMIN';

    useEffect(() => {
        if (isAdmin) {
            loadRoles();
        }
    }, [isAdmin]);

    const loadRoles = async () => {
        try {
            console.log('DEBUG: Attempting to load roles...');
            const data = await userService.getRoles();
            console.log('DEBUG: Roles loaded successfully:', data);
            setRoles(data);
        } catch (err) {
            console.error('DEBUG: Error loading roles:', err);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingUser(null);
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-slate-500">Administra los accesos y roles del sistema</p>
                </div>

                {isAdmin && (
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setShowForm(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        NUEVO USUARIO
                    </button>
                )}
            </div>

            <UserList onEdit={handleEdit} refreshTrigger={refreshTrigger} />

            {showForm && (
                <UserForm
                    user={editingUser}
                    roles={roles}
                    onSave={handleSave}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingUser(null);
                    }}
                />
            )}
        </div>
    );
};

export default UserManagement;
