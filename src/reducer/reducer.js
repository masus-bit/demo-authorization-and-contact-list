import {
  addContact,
  deleteContactFromStore,
  searchContact,
  changedData,
} from "../utils/utils.js";

const InitialState = {
  allContacts: [],
  isAuth: false,
  login: {},
  data: [],
};
const actionType = {
  AUTH: "AUTH",
  LOAD_DATA: "LOAD_DATA",
  ADD_CONTACT: "ADD_CONTACT",
  ADD_STORE_CONT: "ADD_STORE_CONT",
  EDIT_CONTACT: "EDIT_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  DELETE_STORE: "DELETE_STORE",
  LOGIN: "LOGIN",
  SEARCH: "SEARCH",
  EDIT_CONT_STORE: "EDIT_CONT_STORE",
};

export const ActionCreator = {
  login: (email, password) => {
    return {
      type: actionType.LOGIN,
      payload: { email, password },
    };
  },
  auth: (boolean) => {
    return {
      type: actionType.AUTH,
      payload: boolean,
    };
  },
  loadData: (data) => {
    return {
      type: actionType.LOAD_DATA,
      payload: data,
    };
  },
  addContact: (contact) => {
    return {
      type: actionType.ADD_CONTACT,
      payload: contact,
    };
  },
  addStoreContact: (id, name, phone, contacts) => {
    return {
      type: actionType.ADD_STORE_CONT,
      payload: addContact(id, name, phone, contacts),
    };
  },
  saveChanges: (contact) => {
    return {
      type: actionType.EDIT_CONTACT,
      payload: contact,
    };
  },
  saveStoreChanges: (id, name, phone, contacts) => {
    return {
      type: actionType.EDIT_CONT_STORE,
      payload: changedData(id, name, phone, contacts),
    };
  },
  deleteContact: (contact) => {
    return {
      type: actionType.DELETE_CONTACT,
      payload: deleteContactFromStore(contact),
    };
  },
  deleteStoreContact: (contact, contacts) => {
    return {
      type: actionType.DELETE_STORE,
      payload: deleteContactFromStore(contact, contacts),
    };
  },
  search: (inputValue, contacts) => {
    return {
      type: actionType.SEARCH,
      payload: searchContact(inputValue, contacts),
    };
  },
};

export const Operations = {
  changeAuth: () => (dispatch, _getState) => {
    dispatch(ActionCreator.auth(false));
  },
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, { email, password }).then((response) => {
      if (response.status === 200) {
        dispatch(ActionCreator.auth(true));
      } else {
        dispatch(ActionCreator.auth(false));
      }
    });
  },
  loadData: () => (dispatch, _getState, api) => {
    return api.get(`/contacts`).then((response) => {
      dispatch(ActionCreator.loadData(response.data));
    });
  },
  saveChanges: (contact, name, phone) => (dispatch, _getState, api) => {
    return api
      .patch(`/contacts/${contact.id}`, { name, phone })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.saveChanges(contact));
        }
      });
  },
  deleteContact: (contact) => (dispatch, _getState, api) => {
    return api.delete(`/contacts/${contact.id}`).then((response) => {
      if (response.status === 200) {
        dispatch(ActionCreator.deleteContact(contact));
      }
    });
  },
  deleteStoreCont: (contact, contacts) => (dispatch, _getState) => {
    dispatch(ActionCreator.deleteStoreContact(contact, contacts));
  },
  addContact: (id, name, phone, contacts) => (dispatch, _getState, api) => {
    return api.post(`/contacts/`, { name, phone }).then((response) => {
      if (response.status === 200) {
        dispatch(ActionCreator.addStoreContact(id, name, phone, contacts));
      }
    });
  },
};
export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.LOAD_DATA:
      return Object.assign({}, state, {
        allContacts: action.payload,
      });
    case actionType.LOGIN:
      return Object.assign({}, state, {
        login: action.payload,
      });
    case actionType.AUTH:
      return Object.assign({}, state, {
        isAuth: action.payload,
      });
    case actionType.DELETE_STORE:
      return Object.assign({}, state, {
        allContacts: action.payload,
      });
    case actionType.ADD_STORE_CONT:
      return Object.assign({}, state, {
        allContacts: action.payload,
      });
    case actionType.SEARCH:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case actionType.EDIT_CONT_STORE:
      return Object.assign({}, state, {
        allContacts: action.payload,
        data: action.payload,
      });
  }
  return state;
};
