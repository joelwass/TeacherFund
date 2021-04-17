import React, { useState, useEffect } from 'react'
import '../public/styles/main.scss'
import { Flex, Box, IconButton } from '@chakra-ui/react'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const scrollFunc = () => {
      if (window.scrollY > 400) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    window.addEventListener('scroll', scrollFunc)
  }, [])

  const scrollBackFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Flex>
      <Box _hover={{ color: '#f6b333' }}>
        <IconButton
          icon='chevron-up'
          colorScheme='black'
          variant='outline'
          aria-label='Top'
          fontSize='25px'
          onClick={scrollBackFn}
          position='fixed'
          borderRadius='50%'
          bottom={['50px']}
          right='30px'
          display={show ? 'block' : 'none'}
          cursor='pointer'
        />
      </Box>
    </Flex>
  )
}

export default ScrollToTop