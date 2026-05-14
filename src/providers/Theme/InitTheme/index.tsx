'use client'

import { useEffect } from 'react'

import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from '../shared'
import { themeIsValid } from '../types'

export const InitTheme = () => {
  useEffect(() => {
    let themeToSet = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  }, [])

  return null
}
