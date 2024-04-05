'use client';

import Atropos from 'atropos/react';

export default function Prueba({children}) {
  return (
    <Atropos
        activeOffset={40}
        shadowScale={1.05}
      >
        {children}
      </Atropos>
  )
}
