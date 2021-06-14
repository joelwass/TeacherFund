/* global fetch */
import { useState } from 'react'
import { Input, Textarea, Button, FormControl, FormLabel, FormHelperText, useToast } from '@chakra-ui/react'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const toast = useToast()
  const showToast = ({ title, description, status, duration }) => (
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true
    })
  )

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      subject,
      message
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        showToast({
          title: 'Message Sent',
          description: "We'll be in touch!",
          status: 'success',
          duration: '8000'
        })
      } else {
        // TODO: Add better error handling
        showToast({
          title: 'Error sending message',
          description: `HTTP Response Code: ${res.status}`,
          status: 'error',
          duration: '12000'
        })
      }
    }).catch((err) => {
      // TODO: Add better error handling
      showToast({
        title: 'Error sending message',
        description: err.message,
        status: 'error',
        duration: null
      })
    })
  }

  return (
    <form>
      <FormControl mt={3} id='name'>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={name}
        />
      </FormControl>
      <FormControl mt={3} id='email'>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mt={3} id='subject'>
        <FormLabel>Subject</FormLabel>
        <Input
          type='text'
          onChange={(e) => {
            setSubject(e.target.value)
          }}
          value={subject}
        />
      </FormControl>
      <FormControl mt={3} id='message'>
        <FormLabel>Message</FormLabel>
        <Textarea
          h={60}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
        />
      </FormControl>
      <Button
        color='white'
        bg='orange.300'
        mt={5}
        w='100%'
        h={12}
        onClick={(e) => {
          submitHandler(e)
        }}
      >
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
