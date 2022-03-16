import { useContext } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Javascript', slug: 'javascript' },
  { name: 'ReactJS', slug: 'reactjs' },
  { name: 'React Native', slug: 'react-native' },
  { name: 'Node.js', slug: 'node' },
];


const Header = () => {
  return (
    <div className="container sticky mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-white py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              WSASOUZA
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-gray-700 ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Header;