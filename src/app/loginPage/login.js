import { login, logout, loginRedirect } from "./action";
import { useRouter } from "next/navigation";

export function LoginForm() {
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
            로그인 </button>
        </div>
      </div>
    </form >
  );
}

export function ShowLoginInfo({ session, setSession }) {
  const router = useRouter();

  const loggedInNextReq = async () => {
    await loginRedirect(session);
  }

  const logoutReq = async () => {
    try {
      await logout();
      setSession({});
    } catch (e) {
      console.log('err logout()', e);
    }
  }

  return (
    <div>
      <p> 교번: {session.userId} </p>
      <p> 교번: {session.userAffiliation} </p>
      <p> 이름: {session.userName} </p>
      <div className="flex items-center m-4">
        <div className="space-x-4">
          <button className="shadow bg-blue-200 hover:bg-blue-300 focus:shoadow-outline focuse:outline-none text-black font-bold py-2 px-4 rounded"
            onClick={() => { loggedInNextReq(session) }}>
            다음 </button>
          <button className="shadow bg-blue-200 hover:bg-blue-300 focus:shoadow-outline focuse:outline-none text-black font-bold py-2 px-4 rounded"
            onClick={() => { logoutReq() }}>
            로그 아웃 </button>
        </div>
      </div>
    </div>);
}