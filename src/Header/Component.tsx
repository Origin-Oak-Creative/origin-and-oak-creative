import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Logo } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const logoData: Logo = await getCachedGlobal('logo', 1)()

  return <HeaderClient data={headerData} logo={logoData} />
}
