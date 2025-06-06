import LoadingSpinner from '../components/LoadingSpinner';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  getPlatforms, 
  createPlatform, 
  updatePlatform, 
  deletePlatform,
  setupAxiosInterceptors
} from '../utils/api';
import { useKeycloak } from '@react-keycloak/web';

export default function SuperAdminDashboard() {
  const { keycloak, initialized } = useKeycloak();
    if (!initialized) {
      return <LoadingSpinner />;
    }  
  const [showForm, setShowForm] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cloudType: 'VMware',
    location: 'HQ',
    poolTag: '',
    memoryTotal: '',
    memoryUsed: '',
    vcpuTotal: '',
    vcpuUsed: '',
    storageType: 'HDD',
    storageTotal: '',
    storageUsed: ''
  });

  // Initialize axios interceptors
  useEffect(() => {
    setupAxiosInterceptors(keycloak);
  }, [keycloak]);

   // Load platforms from API
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
        alert('Failed to load platforms');
      }
    };

    fetchPlatforms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
 const resetForm = () => {
    setFormData({
      name: '',
      cloudType: 'VMware',
      location: 'HQ',
      poolTag: '',
      memoryTotal: '',
      memoryUsed: '',
      vcpuTotal: '',
      vcpuUsed: '',
      storageType: 'HDD',
      storageTotal: '',
      storageUsed: ''
    });
    setEditingId(null);
  };
  
  const handleSubmit = async () => {
    // Validate inputs
    if (!formData.name || !formData.memoryTotal || !formData.memoryUsed || 
        !formData.vcpuTotal || !formData.vcpuUsed || 
        !formData.storageTotal || !formData.storageUsed) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Prepare the data to send (without percentages)
      const platformData = {
        ...formData,
        // Convert string numbers to proper numbers
        memoryTotal: Number(formData.memoryTotal),
        memoryUsed: Number(formData.memoryUsed),
        vcpuTotal: Number(formData.vcpuTotal),
        vcpuUsed: Number(formData.vcpuUsed),
        storageTotal: Number(formData.storageTotal),
        storageUsed: Number(formData.storageUsed)
      };

      if (editingId) {
        // Update existing platform
        const updatedPlatform = await updatePlatform(editingId, platformData);
        setPlatforms(platforms.map(p => 
          p.id === editingId ? updatedPlatform : p
        ));
      } else {
        // Create new platform
        const newPlatform = await createPlatform(platformData);
        setPlatforms([...platforms, newPlatform]);
      }
      
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving platform:', error);
      alert('Failed to save platform');
    }
  };
 
  
 const handleEdit = (platform) => {
    setFormData({
      name: platform.name,
      cloudType: platform.cloudType,
      location: platform.location,
      poolTag: platform.poolTag,
      memoryTotal: platform.memoryTotal,
      memoryUsed: platform.memoryUsed,
      vcpuTotal: platform.vcpuTotal,
      vcpuUsed: platform.vcpuUsed,
      storageType: platform.storageType,
      storageTotal: platform.storageTotal,
      storageUsed: platform.storageUsed
    });
    setEditingId(platform.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this platform?')) {
      try {
        await deletePlatform(id);
        setPlatforms(platforms.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting platform:', error);
        alert('Failed to delete platform');
      }
    }
  };

  return (
    <DashboardLayout 
      roleName="Super Admin" 
      welcomeMessage="Welcome Super Admin"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Platform Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Platform
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">{editingId ? 'Edit Platform' : 'Create New Platform'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Platform Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Name *</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Cloud Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Cloud Type *</label>
              <select
                name="cloudType"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.cloudType}
                onChange={handleInputChange}
              >
                <option value="VMware">VMware</option>
                <option value="Oracle">Oracle</option>
                <option value="Azure">Azure</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location *</label>
              <select
                name="location"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option value="HQ">HQ</option>
                <option value="Welikada">Welikada</option>
                <option value="Pitipana">Pitipana</option>
              </select>
            </div>

            {/* Pool Tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pool Tag</label>
              <input
                type="text"
                name="poolTag"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.poolTag}
                onChange={handleInputChange}
              />
            </div>

            {/* Memory - Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Memory Total (GB) *</label>
              <input
                type="number"
                name="memoryTotal"
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.memoryTotal}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Memory - Used */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Memory Used (GB) *</label>
              <input
                type="number"
                name="memoryUsed"
                min="0"
                max={formData.memoryTotal || ''}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.memoryUsed}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* vCPU - Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700">vCPU Total *</label>
              <input
                type="number"
                name="vcpuTotal"
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.vcpuTotal}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* vCPU - Used */}
            <div>
              <label className="block text-sm font-medium text-gray-700">vCPU Used *</label>
              <input
                type="number"
                name="vcpuUsed"
                min="0"
                max={formData.vcpuTotal || ''}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.vcpuUsed}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Storage Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Storage Type *</label>
              <select
                name="storageType"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.storageType}
                onChange={handleInputChange}
              >
                <option value="HDD">HDD</option>
                <option value="SSD">SSD</option>
              </select>
            </div>

            {/* Storage - Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Storage Total (GB) *</label>
              <input
                type="number"
                name="storageTotal"
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.storageTotal}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Storage - Used */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Storage Used (GB) *</label>
              <input
                type="number"
                name="storageUsed"
                min="0"
                max={formData.storageTotal || ''}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.storageUsed}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingId ? 'Update Platform' : 'Create Platform'}
              </button>
            </div>
          </div>
        </div>
      )}
    
      {/* Platforms List */}
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-00">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cloud Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool Tag</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vCPU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {platforms.map((platform) => {
              const memoryPercent = ((platform.memoryUsed / platform.memoryTotal) * 100).toFixed(2);
              const vcpuPercent = ((platform.vcpuUsed / platform.vcpuTotal) * 100).toFixed(2);
              const storagePercent = ((platform.storageUsed / platform.storageTotal) * 100).toFixed(2);

              const platformData = {
                ...formData,
                memoryPercent: `${memoryPercent}%`,
                vcpuPercent: `${vcpuPercent}%`,
                storagePercent: `${storagePercent}%`
              };

            return (
              <tr key={platform.id}>
                <td className="px-4 py-4 whitespace-nowrap">{platform.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{platform.cloudType}</td>
                <td className="px-4 py-4 whitespace-nowrap">{platform.location}</td>
                <td className="px-4 py-4 whitespace-nowrap">{platform.poolTag}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {platform.memoryUsed}GB / {platform.memoryTotal}GB ({platform.memoryPercent || ((platform.memoryUsed / platform.memoryTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {platform.vcpuUsed} / {platform.vcpuTotal} ({platform.vcpuPercent || ((platform.vcpuUsed / platform.vcpuTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {platform.storageType}: {platform.storageUsed}GB / {platform.storageTotal}GB ({platform.storagePercent || ((platform.storageUsed / platform.storageTotal) * 100).toFixed(2)}%)
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(platform)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(platform.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
             );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};
