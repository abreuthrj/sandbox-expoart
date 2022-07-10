import { useRouter } from "next/router";
import {
  MdOutlineAddPhotoAlternate,
  MdHomeFilled,
  MdFavorite,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { userStoreSignout } from "store/reducers/User";

export default function Menu() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignout = () => {
    dispatch(userStoreSignout());
    router.push("/login");
  };

  return (
    <nav className="fixed bottom-10 flex justify-center w-full">
      <ul className="flex items-center gap-10 bg-white shadow-md py-2 px-6 rounded-full">
        <li
          onClick={() => router.push("/")}
          className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
        >
          <MdHomeFilled size={24} />
        </li>
        <li
          onClick={() => router.push("/favorites")}
          className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
        >
          <MdFavorite size={24} />
        </li>
        <li
          onClick={() => router.push("/post")}
          className="bg-purple-600 text-white rounded-full scale-[2.5] w-6 h-6 shadow-sm flex items-center justify-center cursor-pointer"
        >
          <MdOutlineAddPhotoAlternate size={14} />
        </li>
        <li className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer">
          <MdPerson size={24} />
        </li>
        <li
          onClick={handleSignout}
          className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
        >
          <MdLogout size={24} />
        </li>
      </ul>
    </nav>
  );
}
