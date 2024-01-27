import { ThumbsUp, ThumbsDown, Repeat } from "react-feather"
import Image from "next/image"

type propType = {
  comment: string
}

export default function Comment(props: propType) {
  return (
    <div className="p-3 rounded-md shadow dark:shadow-gray-600  ">
      <a className="flex items-center gap-3 mb-3" href="/user/65a4bf4bea208a60faff">
        <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow">
          <Image
            src="/assets/user.png"
            alt="user"
            width={135}
            height={135}
            className=" border-4 border-white dark:border-slate-800 rounded-full object-contain"
          />
        </div>
        <div>
          <h5 className="font-medium text-base">Anonymous User</h5>
          <p className="font-thin text-xs/[10px] text-slate-950 dark:text-slate-400">3d ago</p>
        </div>
      </a>
      <a href="/post/65af7e86627eb6f37cf4">
        <p className="text-md mb-4">{props.comment}</p>
      </a>
      <div className="flex justify-around">
        <article
          className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary"
        >
          <ThumbsUp size={22} />
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <ThumbsDown size={22} />
        </article>

        <article className="flex flex-row gap-3 items-center transition ease-in-out duration-200 hover:cursor-pointer text-secondary-light dark:text-white hover:text-primary">
          <Repeat size={22} orientation={'vertical'} />
        </article>


      </div>
    </div>
  )
}