import { formatDistance } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { apiLikePost } from "store/api/index";
import { ApiPostType } from "store/api/types";
import { FaHeart } from "react-icons/fa";

export default function Post({
  date,
  id,
  liked,
  likes,
  title,
  user,
  views,
}: ApiPostType) {
  const [likedState, setLikedState] = useState(liked);

  const handleUpdatePostLike = async (like: boolean) => {
    setLikedState(like);

    try {
      await apiLikePost(id, like);
    } catch (err) {
      console.log(err);
      setLikedState(!like);
    }
  };

  return (
    <div className="w-full mx-[16%] my-12">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3">
          <div className="rounded-full overflow-hidden w-12 h-12 shadow-md">
            <Image src="/avatar.webp" alt="Avatar" objectFit="cover" />
          </div>

          <div className="flex flex-col">
            <strong>{user.name}</strong>

            <span className="text-gray-400 text-sm">
              {formatDistance(Date.parse(date), Date.now(), {
                includeSeconds: true,
              })}
            </span>
          </div>
        </div>

        <div>
          <span className="text-gray-400 text-bold text-sm mr-2">
            this art is called
          </span>
          <strong className="text-3xl">{title}</strong>
        </div>
      </div>

      <div className="w-full my-10 relative">
        <Image
          src="/sunflowers.webp"
          alt={title}
          objectFit="cover"
          layout="responsive"
        />

        <div className="absolute w-[120px] h-7 right-0 top-0 bg-[#D9D9D9AB] flex items-center justify-evenly rounded-bl-md">
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19L11.18 18.2933C9.76667 17.0582 8.6 15.9918 7.68 15.0941C6.76 14.1965 6.02667 13.3943 5.48 12.6876C4.93333 11.9809 4.55 11.3411 4.33 10.7681C4.11 10.1951 4 9.61573 4 9.03001C4 7.88404 4.40333 6.92588 5.21 6.15553C6.01667 5.38517 7.01333 5 8.2 5C8.96 5 9.66333 5.1719 10.31 5.51569C10.9567 5.85948 11.52 6.35607 12 7.00546C12.56 6.31787 13.1533 5.81173 13.78 5.48704C14.4067 5.16235 15.08 5 15.8 5C16.9867 5 17.9833 5.38517 18.79 6.15553C19.5967 6.92588 20 7.88404 20 9.03001C20 9.61573 19.89 10.1951 19.67 10.7681C19.45 11.3411 19.0667 11.9809 18.52 12.6876C17.9733 13.3943 17.24 14.1965 16.32 15.0941C15.4 15.9918 14.2333 17.0582 12.82 18.2933L12 19ZM12 17.4911C13.3467 16.307 14.4567 15.2915 15.33 14.4447C16.2033 13.598 16.8967 12.8563 17.41 12.2196C17.9233 11.583 18.2833 11.0164 18.49 10.5198C18.6967 10.0232 18.8 9.5266 18.8 9.03001C18.8 8.18963 18.52 7.49886 17.96 6.95771C17.4 6.41655 16.68 6.14598 15.8 6.14598C15.12 6.14598 14.4867 6.34652 13.9 6.74761C13.3133 7.1487 12.84 7.71214 12.48 8.43793H11.5C11.1533 7.72487 10.6867 7.16462 10.1 6.75716C9.51333 6.3497 8.88 6.14598 8.2 6.14598C7.32 6.14598 6.6 6.41655 6.04 6.95771C5.48 7.49886 5.2 8.18963 5.2 9.03001C5.2 9.5266 5.30333 10.0264 5.51 10.5293C5.71667 11.0323 6.07667 11.6053 6.59 12.2483C7.10333 12.8913 7.8 13.633 8.68 14.4734C9.56 15.3138 10.6667 16.3197 12 17.4911Z"
                fill="#555555"
              />
            </svg>

            <span className="text-xs">{likes}</span>
          </div>

          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.4C12.9682 15.4 13.7898 15.07 14.4648 14.41C15.1398 13.75 15.4773 12.9467 15.4773 12C15.4773 11.0533 15.1398 10.25 14.4648 9.59C13.7898 8.93 12.9682 8.6 12 8.6C11.0318 8.6 10.2102 8.93 9.53523 9.59C8.86023 10.25 8.52273 11.0533 8.52273 12C8.52273 12.9467 8.86023 13.75 9.53523 14.41C10.2102 15.07 11.0318 15.4 12 15.4ZM12 14.24C11.3591 14.24 10.817 14.0233 10.3739 13.59C9.93068 13.1567 9.70909 12.6267 9.70909 12C9.70909 11.3733 9.93068 10.8433 10.3739 10.41C10.817 9.97667 11.3591 9.76 12 9.76C12.6409 9.76 13.183 9.97667 13.6261 10.41C14.0693 10.8433 14.2909 11.3733 14.2909 12C14.2909 12.6267 14.0693 13.1567 13.6261 13.59C13.183 14.0233 12.6409 14.24 12 14.24ZM12 18C10.0091 18 8.20909 17.4467 6.6 16.34C4.99091 15.2333 3.79091 13.7867 3 12C3.79091 10.2133 4.99091 8.76667 6.6 7.66C8.20909 6.55333 10.0091 6 12 6C13.9909 6 15.7909 6.55333 17.4 7.66C19.0091 8.76667 20.2091 10.2133 21 12C20.2091 13.7867 19.0091 15.2333 17.4 16.34C15.7909 17.4467 13.9909 18 12 18ZM12 16.8C13.65 16.8 15.167 16.3633 16.5511 15.49C17.9352 14.6167 18.9886 13.4533 19.7114 12C18.9886 10.5467 17.9352 9.38333 16.5511 8.51C15.167 7.63667 13.65 7.2 12 7.2C10.35 7.2 8.83295 7.63667 7.44886 8.51C6.06477 9.38333 5.00455 10.5467 4.26818 12C5.00455 13.4533 6.06477 14.6167 7.44886 15.49C8.83295 16.3633 10.35 16.8 12 16.8Z"
                fill="#555555"
              />
            </svg>

            <span className="text-xs">{views}</span>
          </div>
        </div>

        <div className="absolute bottom-0 w-full flex justify-center">
          <div
            className="w-[10rem] h-[5rem] bg-gray-200 rounded-tl-full rounded-tr-full flex items-center justify-center cursor-pointer"
            onClick={() => handleUpdatePostLike(!likedState)}
          >
            <FaHeart
              className="transition-colors"
              color={likedState ? "#FF5151" : "#FFFFFF"}
              size={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
