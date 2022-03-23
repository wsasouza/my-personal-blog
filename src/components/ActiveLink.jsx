import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const isNotActiveStyle =
    'text-lightGray hover:font-semibold hover:text-primary'
  const isActiveStyle = 'font-semibold text-accentColor'

  const router = useRouter()
  const className = router.asPath === href ? isActiveStyle : isNotActiveStyle

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default ActiveLink
