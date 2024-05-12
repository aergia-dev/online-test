'use client'
import { redirect } from "next/navigation";
import { login, getSession } from "./action";

export default async function LoginFrom() {

  // getSession().then(session => {
  //   console.log(session);
  // }).catch(error => {
  //   console.error(error);
  // }) 
  
  // console.log("login ", s);
  return <Login />
}


function Login() {
  // const loginFn = () {
  // }
  
  return (
    <form
      action={login}
      className="w-full max-w-sm align-middle items-center" >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
            htmlFor="userId">
            교번
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
            id="userId"
            name="userId"
            type="text"
            placeholder="교번" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
            htmlFor="userAffiliation">
            소속
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
            id="userAffiliation"
            name="userAffiliation"
            type="text"
            placeholder="소속" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:bm-0 pr-4"
            htmlFor="userName">
            이름
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
            id="userName"
            name="userName"
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
    </form >
  );
}


// function LogoutButton() {
//   const { logout } = useSession();

//   return (
//     <p>
//       <a className=""
//         onClick={(event) => {
//           event.preventDefault();
//           logout(null, { optimisticData: DefaultSession, });
//         }}
//       > log out</a>
//     </p>
//   )
// }