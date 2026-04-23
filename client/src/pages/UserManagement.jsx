import { useState, useEffect } from 'react';
import api from '../api/axios';

const UserManagement = () => {
    const [roles, setRoles] = useState([]);
    const [groupedPermissions, setGroupedPermissions] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [checkedPermissions, setCheckedPermissions] = useState([]);
    const [message, setMessage] = useState('');

    // 1. Fetch Roles and All Permissions on component load
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const rolesRes = await api.get('/permissions/roles');
                setRoles(rolesRes.data);

                const permsRes = await api.get('/permissions');
                setGroupedPermissions(permsRes.data);
            } catch (error) {
                console.error('Error fetching initial data', error);
            }
        };
        fetchInitialData();
    }, []);

    // 2. Fetch specific permissions when a Role is selected from the dropdown
    const handleRoleSelect = async (e) => {
        const roleId = e.target.value;
        setSelectedRoleId(roleId);
        setMessage('');

        if (!roleId) {
            setCheckedPermissions([]);
            return;
        }

        try {
            const response = await api.get(`/permissions/role/${roleId}`);
            // The backend returns an array of permission objects. We just need their IDs to check the boxes.
            const permissionIds = response.data.map(perm => perm.id);
            setCheckedPermissions(permissionIds);
        } catch (error) {
            console.error('Error fetching role permissions', error);
        }
    };

    // 3. Handle checking/unchecking boxes
    const handleCheckboxChange = (permissionId) => {
        setCheckedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                // If it's already checked, remove it (uncheck)
                return prev.filter(id => id !== permissionId);
            } else {
                // If it's not checked, add it (check)
                return [...prev, permissionId];
            }
        });
    };

    // 4. Save the updated permissions to the backend
    const handleSave = async () => {
        try {
            await api.put(`/permissions/role/${selectedRoleId}`, {
                permissionIds: checkedPermissions
            });
            setMessage('Permissions updated successfully!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error saving permissions', error);
            setMessage('Failed to update permissions.');
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>Role & Permission Management</h1>

            {/* Role Selection Dropdown */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <label style={{ fontWeight: 'bold', marginRight: '15px' }}>Select Role to Edit:</label>
                <select
                    value={selectedRoleId}
                    onChange={handleRoleSelect}
                    style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">-- Select a Role --</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
            </div>

            {/* Checkbox Grid (Only shows if a role is selected) */}
            {selectedRoleId && (
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2>Assign Permissions</h2>
                        <button
                            onClick={handleSave}
                            style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Save Changes
                        </button>
                    </div>

                    {message && <div style={{ padding: '10px', backgroundColor: '#d1fae5', color: '#065f46', marginBottom: '20px', borderRadius: '4px' }}>{message}</div>}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {/* Loop through each Module (e.g., Dashboard, Employee Management) */}
                        {Object.keys(groupedPermissions).map(moduleName => (
                            <div key={moduleName} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '15px' }}>
                                <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '15px', color: '#334155' }}>
                                    {moduleName}
                                </h3>

                                {/* Loop through the specific permissions for this module */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {groupedPermissions[moduleName].map(perm => (
                                        <label key={perm.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={checkedPermissions.includes(perm.id)}
                                                onChange={() => handleCheckboxChange(perm.id)}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{perm.name}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{perm.description}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;