import React, { useState } from "react";
import BulkEditModal from "./BulkEditModal";
import ConfirmationModal from "./ConfirmationModal";
import "./BulkActionBar.css";

const BulkActionBar = ({
  selectedCount,
  selectedData,
  onClearSelection,
  onBulkDelete,
  onBulkEdit,
  editableFields = [], // Array of field configs for bulk edit
  customHeaders = [], // Array of header names for export
  dataKeys = [], // Array of data keys or nested paths for export
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleActionClick = (action) => {
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const handleExport = () => {
    if (!selectedData || selectedData.length === 0) {
      alert("No data to export");
      return;
    }

    // Use customHeaders and dataKeys if provided, otherwise fall back to object keys
    const headers = customHeaders.length > 0 ? customHeaders : Object.keys(selectedData[0]);
    const keys = dataKeys.length > 0 ? dataKeys : Object.keys(selectedData[0]);

    // Escape CSV values to handle special characters and date formats
    const escapeCsvValue = (value, key) => {
      if (value === null || value === undefined) {
        return '""';
      }

      let stringValue = String(value).trim();

      // Deteksi format tanggal umum
      const isShortDate = /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(stringValue); // e.g., 20-02-2025
      const isLongDate = /^\d{1,2} [A-Za-z]+ \d{4}$/.test(stringValue); // e.g., 27 June 2025

      if (isShortDate || isLongDate) {
        stringValue = `="${stringValue}"`;
      }

      // Escape internal quotes
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const separator = ";";
    const BOM = "\uFEFF";
    const csvRows = [];

    // Header row
    csvRows.push(headers.map((header) => escapeCsvValue(header)).join(separator));

    // Data rows
    selectedData.forEach((row) => {
      const rowData = keys.map((key) => {
        if (key.includes(".")) {
          const [parent, child] = key.split(".");
          return escapeCsvValue(row[parent]?.[child], key);
        }
        return escapeCsvValue(row[key], key);
      });
      csvRows.push(rowData.join(separator));
    });

    const csvContent = BOM + csvRows.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `export_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleConfirm = () => {
    switch (confirmAction?.type) {
      case "delete":
        onBulkDelete(selectedData);
        break;
      case "edit":
        setShowEditModal(true);
        break;
      case "export":
        handleExport();
        onClearSelection(); // Clears selection after export
        break;
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleBulkEditSubmit = (editedData) => {
    onBulkEdit(selectedData, editedData);
    setShowEditModal(false);
  };

  const getConfirmMessage = () => {
    switch (confirmAction?.type) {
      case "delete":
        return `Are you sure you want to delete ${selectedCount} selected items? This action cannot be undone.`;
      case "edit":
        return `Are you sure you want to edit ${selectedCount} selected items?`;
      case "export":
        return `Export ${selectedCount} selected items to file?`;
      default:
        return "";
    }
  };

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#ffff",
          color: "#6b7280",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px 8px 0 0",
          marginBottom: "1px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="text-sm text-gray-500 bg-cyan-500/20 px-3 py-1 rounded-full">
              {selectedCount} items selected
            </span>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
              <button
              className="bulk-action-button export"
              onClick={() => handleActionClick({ type: "export" })}
              >
              <ExportIcon />
              Export
              </button>

              <button
              className="bulk-action-button edit"
              onClick={() => handleActionClick({ type: "edit" })}
              >
              <EditIcon />
              Edit
              </button>

              <button
              className="bulk-action-button delete"
              onClick={() => handleActionClick({ type: "delete" })}
              >
              <DeleteIcon />
              Delete
              </button>

              <button
              className="bulk-action-button clear"
              onClick={onClearSelection}
              >
              <ClearIcon />
              Clear
              </button>
        </div>
      </div>

      {showEditModal && (
        <BulkEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleBulkEditSubmit}
          selectedCount={selectedCount}
          editableFields={editableFields}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          title={`Confirm ${confirmAction?.type}`}
          message={getConfirmMessage()}
          confirmText="Yes, Continue"
          cancelText="Cancel"
          type={confirmAction?.type}
        />
      )}
    </>
  );
};

const ExportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6" />
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2" />
    <line x1="9" y1="9" x2="9" y2="17" />
    <line x1="15" y1="9" x2="15" y2="17" />
  </svg>
);

const ClearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default BulkActionBar;