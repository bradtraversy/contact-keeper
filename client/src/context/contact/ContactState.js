import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Create a custom hook to use the contact context

export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning

// Get Contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Add Contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete Contact
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Update Contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear Contacts
export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

// Set Current Contact
export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};

// Clear Current Contact
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Contacts
export const filterContacts = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
