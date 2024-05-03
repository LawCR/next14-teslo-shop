'use client'

import { useEffect, useState } from 'react'

export const useClientLoaded = () => {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return {
    loaded
  }
}
