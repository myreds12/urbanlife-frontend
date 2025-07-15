import React, { useState } from "react";

const BulkEditModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedCount, 
  editableFields = [] 
}) => {
  const [formData, setFormData] = useState({});
  const [enabledFields, setEnabledFields] = useState({});

  if (!isOpen) return null;

  const handleFieldToggle = (fieldName) => {
    setEnabledFields(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
    
    // Clear form data if field is disabled
    if (enabledFields[fieldName]) {
      setFormData(prev => {
        const newData = { ...prev };
        delete newData[fieldName];
        return newData;
      });
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only submit data for enabled fields
    const filteredData = {};
    Object.keys(enabledFields).forEach(fieldName => {
      if (enabledFields[fieldName] && formData[fieldName] !== undefined) {
        filteredData[fieldName] = formData[fieldName];
      }
    });
    
    onSubmit(filteredData);
    
    // Reset form
    setFormData({});
    setEnabledFields({});
  };

  const renderField = (field) => {
    const isEnabled = enabledFields[field.name];
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={!isEnabled}
            placeholder={field.placeholder}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: isEnabled ? 'white' : '#f9fafb',
              color: isEnabled ? '#111827' : '#6b7280',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              if (isEnabled) {
                e.target.style.borderColor = '#0092B8';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        );
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={!isEnabled}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: isEnabled ? 'white' : '#f9fafb',
              color: isEnabled ? '#111827' : '#6b7280',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              if (isEnabled) {
                e.target.style.borderColor = '#0092B8';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={!isEnabled}
            placeholder={field.placeholder}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: isEnabled ? 'white' : '#f9fafb',
              color: isEnabled ? '#111827' : '#6b7280',
              outline: 'none',
              resize: 'vertical',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              if (isEnabled) {
                e.target.style.borderColor = '#0092B8';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        );
        
      case 'date':
      case 'datetime-local':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            disabled={!isEnabled}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: isEnabled ? 'white' : '#f9fafb',
              color: isEnabled ? '#111827' : '#6b7280',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              if (isEnabled) {
                e.target.style.borderColor = '#0092B8';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827'
          }}>
            Bulk Edit {selectedCount} Items
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: '24px',
          maxHeight: 'calc(80vh - 140px)',
          overflowY: 'auto'
        }}>
          <div style={{
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            <strong>Note:</strong> Toggle the fields you want to edit. Only enabled fields will be updated for all selected items.
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '20px' }}>
              {editableFields.map((field) => (
                <div key={field.name} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '16px',
                  backgroundColor: enabledFields[field.name] ? '#f8fafc' : '#ffffff'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <input
                        type="checkbox"
                        checked={enabledFields[field.name] || false}
                        onChange={() => handleFieldToggle(field.name)}
                        style={{
                          marginRight: '8px',
                          width: '16px',
                          height: '16px',
                          accentColor: '#0092B8'
                        }}
                      />
                      Edit {field.label}
                    </label>
                  </div>
                  
                  {renderField(field)}
                  
                  {field.description && (
                    <div style={{
                      marginTop: '4px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {field.description}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={Object.keys(enabledFields).length === 0 || !Object.values(enabledFields).some(v => v)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: Object.keys(enabledFields).length === 0 || !Object.values(enabledFields).some(v => v) ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  fontSize: '14px',
                  cursor: Object.keys(enabledFields).length === 0 || !Object.values(enabledFields).some(v => v) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#007F9F';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#0092B8';
                  }
                }}
              >
                Update {selectedCount} Items
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkEditModal;