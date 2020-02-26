import React from 'react'
import {
  useContacts,
  filterContacts,
  clearFilter
} from '../../context/contact/ContactState'

const ContactFilter = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, contactDispatch] = useContacts()

  const onChange = e => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value)
    } else {
      clearFilter(contactDispatch)
    }
  }

  return (
    <form>
      <input type='text' placeholder='Filter Contacts...' onChange={onChange} />
    </form>
  )
}

export default ContactFilter
