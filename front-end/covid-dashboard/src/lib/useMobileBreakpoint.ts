import * as React from 'react'

export function useMobileBreakpoint(): boolean {
  const [isMobile, setMobile] = React.useState(window.innerWidth < 1024)

  React.useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
