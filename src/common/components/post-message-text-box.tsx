import { useState, type FormEvent } from "react";
import { postMessage } from "@/api/index";

const PostMessageTextBox = () => {
  const [isPostLoading, setIsPostLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message")?.toString();
    if (!message) return;

    setIsPostLoading(true);
    const res = await postMessage(message);
    console.log(res);

    setIsPostLoading(false);
    form.reset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="message">Type something in the box below, then hit "Post"</label>
      <textarea
        required
        rows={4}
        id="message"
        name="message"
        className="border shadow-sm resize-y w-full py-1 px-2"
        placeholder="Whats Happing?!"
      />

      <div className="flex justify-end gap-2">
        <button
          disabled={isPostLoading}
          type="submit"
          className="bg-gray-700 hover:opacity-90 font-medium text-white text-sm md:text-base rounded-full px-5 py-2 leading-none disabled:opacity-80"
        >
          {isPostLoading ? "Posting..." : "Post"}
        </button>

        {/* <button
          onClick={handleDeleteAll}
          disabled={isPostLoading}
          type="button"
          className="border-current text-red-500 font-medium border hover:text-red-400 text-sm md:text-base rounded-full px-5 py-2 leading-none disabled:opacity-80"
        >
          {isPostLoading ? "Deleting..." : "Delete All"}
        </button> */}
      </div>
    </form>
  );
};

export default PostMessageTextBox;
