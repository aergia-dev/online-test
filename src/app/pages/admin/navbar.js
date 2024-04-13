import React from 'react';
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow justify-between">
          <a href="/pages/admin/questions" className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-white mr-4">
            문제 관리 
          </a>
          <a href="/pages/admin/monitoring" className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-white mr-4">
            시험 관리
          </a>
        </div>
     </div>
    </nav>
  );
}

