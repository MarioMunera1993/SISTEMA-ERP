import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

const UserForm = ({ user, roles, onSave, onCancel }) => {
    console.log('DEBUG: UserForm received roles:', roles);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: { id: 1 },
        active: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                password: '' // Don't load password
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Prepare data: filter out empty role or ensure it's structured correctly
            const dataToSave = { ...formData };
            if (typeof dataToSave.role === 'number' || typeof dataToSave.role === 'string') {
                dataToSave.role = { id: parseInt(dataToSave.role) };
            }

            if (user) {
                await userService.updateUser(user.id, dataToSave);
            } else {
                await userService.registerUser(dataToSave);
            }
            onSave();
        } catch (err) {
            setError(err.response?.data || 'Error al guardar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1 uppercase tracking-wider">Nombre Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>

                    {!user && (
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-1 uppercase tracking-wider">Usuario</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1 uppercase tracking-wider">
                            {user ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                        </label>
                        <input
                            type="password"
                            required={!user}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-1 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-1 uppercase tracking-wider">Rol</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                value={formData.role?.id || ''}
                                onChange={(e) => setFormData({ ...formData, role: { id: parseInt(e.target.value) } })}
                            >
                                <option value="" disabled>Seleccione un rol</option>
                                {roles && roles.length > 0 ? (
                                    roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>Cargando roles...</option>
                                )}
                            </select>
                        </div>
                        <div className="flex items-end pb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                />
                                <span className="text-slate-700 font-bold text-sm uppercase tracking-wider">Activo</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:bg-blue-300"
                        >
                            {loading ? 'GUARDANDO...' : 'GUARDAR'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
