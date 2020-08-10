export const deleteContactFromStore = (contact, contacts) => {
  const index = (arr) => arr.findIndex((item) => item.id === contact.id);
  let splicedArray = [...contacts];
  splicedArray.splice(index(contacts), 1);
  return splicedArray;
};

export const addContact = (id, name, phone, contacts) => {
  contacts.push({ id, name, phone });
  return contacts;
};

export const searchContact = (inputValue, contacts) => {
  return contacts.filter((item) => {
    let regexp = new RegExp(`${inputValue}`, "i");
    if (regexp.test(item.name)) {
      return item;
    }
  });
};
export const changedData = (id, name, phone, contacts) => {
  const index = (arr) => arr.findIndex((item) => item.id === id);
  let splicedArray = [...contacts];
  splicedArray.splice(index(contacts), 1, { id, name, phone });
  return splicedArray;
};
