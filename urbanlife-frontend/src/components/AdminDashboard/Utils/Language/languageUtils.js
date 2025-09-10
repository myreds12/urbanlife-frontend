export const normalizeLanguageField = (data, fieldName, isArray = false, subField = null) => {
  if (!data) return { en: '', id: '' };

  // field terpisah (title_en, title_id)
  const enKey = `${fieldName}_en`;
  const idKey = `${fieldName}_id`;
  if (data[enKey] && data[idKey]) {
    return { en: data[enKey], id: data[idKey] };
  }

  // array dengan bahasa (news_content, kendaraan_content, dll.)
  if (isArray && Array.isArray(data[fieldName])) {
    const result = { en: '', id: '' };
    data[fieldName].forEach((item) => {
      const targetField = subField || 'deskripsi'; 
      if (item.bahasa === 'ENGLISH') result.en = item[targetField] || '';
      if (item.bahasa === 'INDONESIA') result.id = item[targetField] || '';
    });
    return result;
  }

  // nested array (aboutus_service, aboutus_achievment)
  if (isArray && Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      title: normalizeLanguageField(item, 'title'),
      content: normalizeLanguageField(item, 'content'),
    }));
  }

  // fallback
  return { en: data[fieldName] || '', id: data[fieldName] || '' };
};