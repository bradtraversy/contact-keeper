import React, { useRef, useEffect } from 'react'
import {
  useContacts,
  filterContacts,
  clearFilter
} from '../../context/contact/ContactState'

const ContactFilter = () => {
  const text = useRef('')
  const [contactState, contactDispatch] = useContacts()

  const { filtered } = contactState

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(contactDispatch, e.target.value)
    } else {
      clearFilter(contactDispatch)
    }
  }

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  )
}

export default ContactFilter
