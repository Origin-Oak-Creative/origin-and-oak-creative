'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import type { Logo as LogoType } from '@/payload-types'

import { Logo } from '@/Logo/Component'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  logo: LogoType
}

// TODO: Add logo to header

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const media = logo && typeof logo.media === 'object' ? logo.media : null
  const logoUrl = media?.sizes?.thumbnail?.url || media?.url
  const logoHeight = media?.sizes?.thumbnail?.height || media?.height || undefined
  const logoWidth = media?.sizes?.thumbnail?.width || media?.width || undefined

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header {...(theme ? { 'data-theme': theme } : {})}>
      <div>
        <Link href="/">
          {media && logoUrl && (
            <Logo
              loading="eager"
              priority="high"
              image={logoUrl}
              alt={media.alt}
              height={logoHeight}
              width={logoWidth}
            />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
