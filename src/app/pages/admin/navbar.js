import React from 'react';
import Link from 'next/link'

export default function Navbar() {
  return (
  <div className="navbar bg-base-100">
      <div className="flex-row">
          <p className="font-bold text-inherit"> ??????abc </p>
      </div>
      <div className="flex-none">
        <ul>
          <li>
            <Link href="/pages/admin/questions">문제 관리</Link>
          </li>
          <li>
            <Link href="/pages/admin/monitoring">시험 관리</Link>
          </li>
        </ul>
      </div>
  </div>
  );
}

