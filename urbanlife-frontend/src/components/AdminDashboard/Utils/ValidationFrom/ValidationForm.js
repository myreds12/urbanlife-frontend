// utils/validateForm.js

export const validateForm = (formData, rules) => {
  for (const rule of rules) {
    const value = formData[rule.key];

    // Check if required
    if (rule.required) {
      const isEmpty =
        typeof value === "string"
          ? value.trim() === "" || value.trim() === "+62"
          : value === null || value === undefined;

      if (isEmpty) {
        return { valid: false, message: `${rule.label} tidak boleh kosong.` };
      }
    }

    // Type validations
    if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { valid: false, message: `${rule.label} harus berupa email valid.` };
    }

    if (rule.type === "number" && (isNaN(value) || Number(value) <= 0)) {
      return { valid: false, message: `${rule.label} harus berupa angka lebih dari 0.` };
    }

    if (rule.type === "phone" && !/^(\+62|0)[0-9]{9,15}$/.test(value)) {
      return { valid: false, message: `${rule.label} harus berupa nomor HP yang valid.` };
    }
  }

  return { valid: true };
};
