import React from 'react';

const CreateTemplateModal = ({ isOpen, onClose, newTemplate, onInputChange, onSave, admin1, admin2 }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-1/2 p-4 space-y-4">
          <h2 className="text-lg font-semibold">Create New Template</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">* Template Name</label>
            <input
              type="text"
              name="name"
              value={newTemplate.name}
              onChange={onInputChange}
              placeholder="Notifikasi pemesanan"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">* Category</label>
            <select
              name="category"
              value={newTemplate.category}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="">Notifikasi</option>
              <option value="Notifikasi">Notifikasi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">* Text to admin</label>
            <textarea
              name="textToAdmin"
              value={newTemplate.textToAdmin}
              onChange={onInputChange}
              placeholder="Text to admin"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">* Text to customer</label>
            <textarea
              name="textToCustomer"
              value={newTemplate.textToCustomer}
              onChange={onInputChange}
              placeholder="Text to customer"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>
        </div>

        <div className="w-1/2 p-4 bg-gray-50 flex flex-col">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <span className="font-semibold">{newTemplate.name || 'Urbanlife'}</span>
          </div>
          <div className="bg-green-100 p-2 rounded-lg max-w-xs">
            <p className="text-green-800">
              {newTemplate.textToCustomer || 'Terjadi perbaikan sistem malam ini...'}
            </p>
          </div>
          <div className="mt-auto flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
              onClick={onSave}
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateModal;