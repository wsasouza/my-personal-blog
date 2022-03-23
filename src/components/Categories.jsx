import { useState, useEffect } from 'react'

import { getCategories } from '../services'
import ActiveLink from './ActiveLink'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-secondary p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold text-primary">
        Categorias
      </h3>
      {categories.map((category, index) => (
        <ActiveLink key={index} href={`/category/${category.slug}`}>
          <div
            className={`block cursor-pointer ${
              index === categories.length - 1 ? 'border-b-0' : 'border-b'
            } mb-3 pb-3`}
          >
            <span>{category.name}</span>
          </div>
        </ActiveLink>
      ))}
    </div>
  )
}

export default Categories
