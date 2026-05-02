import { useState, useEffect } from 'react';
import api from '../api/axios';

const UserManagement = () => {
    const [roles, setRoles] = useState([]);
    const [groupedPermissions, setGroupedPermissions] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [checkedPermissions, setCheckedPermissions] = useState([]);
    
    // New UX States
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // 1. Fetch Roles and All Permissions on component load
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                // Run both fetches in parallel for faster loading
                const [rolesRes, permsRes] = await Promise.all([
                    api.get('/permissions/roles'),
                    api.get('/permissions')
                ]);
                
                setRoles(rolesRes.data);
                setGroupedPermissions(permsRes.data);
            } catch (error) {
                console.error('Error fetching initial data', error);
                setMessage({ text: 'Failed to load roles and permissions. Please refresh.', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    // 2. Fetch specific permissions when a Role is selected from the dropdown
    const handleRoleSelect = async (e) => {
        const roleId = e.target.value;
        setSelectedRoleId(roleId);
        setMessage({ text: '', type: '' });

        if (!roleId) {
            setCheckedPermissions([]);
            return;
        }

        try {
            // Optional: You could add a mini loading state here if your backend is slow
            const response = await api.get(`/permissions/role/${roleId}`);
            const permissionIds = response.data.map(perm => perm.id);
            setCheckedPermissions(permissionIds);
        } catch (error) {
            console.error('Error fetching role permissions', error);
            setMessage({ text: 'Failed to load permissions for this role.', type: 'error' });
        }
    };

    // 3. Handle checking/unchecking individual boxes
    const handleCheckboxChange = (permissionId) => {
        setCheckedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter(id => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    // NEW: Handle "Select All" for a specific module group
    const handleModuleSelectAll = (moduleName, isChecked) => {
        const modulePermIds = groupedPermissions[moduleName].map(perm => perm.id);
        
        setCheckedPermissions(prev => {
            if (isChecked) {
                // Add all IDs from this module, using Set to prevent duplicates
                return Array.from(new Set([...prev, ...modulePermIds]));
            } else {
                // Remove all IDs belonging to this module
                return prev.filter(id => !modulePermIds.includes(id));
            }
        });
    };

    // 4. Save the updated permissions to the backend
    const handleSave = async () => {
        if (!selectedRoleId) return;
        
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        try {
            await api.put(`/permissions/role/${selectedRoleId}`, {
                permissionIds: checkedPermissions
            });
            setMessage({ text: 'Permissions updated successfully!', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error saving permissions', error);
            setMessage({ text: 'Failed to update permissions.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading management console...</div>;
    }

    return (
        <div style={{ fontFamily: 'sans-serif', color: '#334155' }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Role & Permission Management</h1>

            {/* Global Error/Success Message */}
            {message.text && (
                <div style={{ 
                    padding: '12px 20px', 
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2', 
                    color: message.type === 'success' ? '#065f46' : '#991b1b', 
                    marginBottom: '20px', 
                    borderRadius: '6px',
                    border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
                }}>
                    {message.text}
                </div>
            )}

            {/* Role Selection Dropdown */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <label style={{ fontWeight: '600', marginRight: '15px' }}>Select Role to Edit:</label>
                <select
                    value={selectedRoleId}
                    onChange={handleRoleSelect}
                    style={{ padding: '10px', width: '300px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', cursor: 'pointer' }}
                >
                    <option value="">-- Select a Role --</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
            </div>

            {/* Checkbox Grid (Only shows if a role is selected) */}
            {selectedRoleId && (
                <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Assign Permissions</h2>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{ 
                                backgroundColor: isSaving ? '#94a3b8' : '#10b981', 
                                color: 'white', 
                                padding: '10px 24px', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: isSaving ? 'not-allowed' : 'pointer', 
                                fontWeight: 'bold',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {/* Loop through each Module */}
                        {Object.keys(groupedPermissions).map(moduleName => {
                            // Check if all permissions in this module are currently selected
                            const modulePermIds = groupedPermissions[moduleName].map(p => p.id);
                            const isAllSelected = modulePermIds.length > 0 && modulePermIds.every(id => checkedPermissions.includes(id));

                            return (
                                <div key={moduleName} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0', overflow: 'hidden' }}>
                                    
                                    {/* Module Header with Select All */}
                                    <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>
                                            {moduleName}
                                        </h3>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={isAllSelected}
                                                onChange={(e) => handleModuleSelectAll(moduleName, e.target.checked)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            Select All
                                        </label>
                                    </div>

                                    {/* Specific Permissions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '12px' }}>
                                        {groupedPermissions[moduleName].map(perm => (
                                            <label key={perm.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={checkedPermissions.includes(perm.id)}
                                                    onChange={() => handleCheckboxChange(perm.id)}
                                                    style={{ width: '16px', height: '16px', cursor: 'pointer', marginTop: '3px' }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{perm.name}</div>
                                                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', lineHeight: '1.4' }}>{perm.description}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;