import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function LoginForm() {
   async function handleSubmit(formData) {
    'use server';
    console.log(typeof(formData));
    console.log(Object.keys(formData));
    console.log(formData);
    console.log(formData.get('name'));
    console.log(formData.get('idNum'));
    console.log(formData.get('affiliation'));
    const name = formData.get('name');
    const idNum = formData.get('idNum');
    const affiliation = formData.get('affiliation');

    //add checking  a validation of name, idNum, affiliation
    //add nextauth 

    //temp. only name is admin then redirect admin page
    if(name === 'admin') {
      redirect('/pages/admin')
    }
  };
 
  return (
  <form action={handleSubmit}
        className="w-full max-w-sm align-middle items-center" >
    <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
                   htmlFor="idNum">
              교번
            </label>
          </div>
          <div className = "md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
                   id="idNum"
                   name="idNum"
                   type="text"
                   placeholder="교번" />
          </div>
    </div>
    <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
                   htmlFor="affiliation">
              소속 
            </label>
          </div>
          <div className = "md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
                   id="affiliation"
                   name="affiliation"
                   type="text"
                   placeholder="소속" />
          </div>
    </div>
     <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
                   htmlFor="name">
              이름 
            </label>
          </div>
          <div className = "md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
                   id="name"
                   name="name"
                   type="text"
                   placeholder="이름" />
          </div>
    </div>
    <div className="md:flex md:items-center">
      <div className="md:w-1/3"></div>
      <div className="md:w-2/3">
        <button className="shadow bg-blue-200 hover:bg-blue-300 focus:shoadow-outline focuse:outline-none text-black font-bold py-2 px-4 rounded"
                type="submit">
                제출 </button>
      </div>
    </div>
 </form>
  ); 
}
