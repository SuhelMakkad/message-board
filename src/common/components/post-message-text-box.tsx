import { useState, type FormEvent } from "react";
import { postMessage } from "@/api/index";
import { useMessagesStore } from "@/stores/messages";

const PostMessageTextBox = () => {
  const { addMessages, removeMessages } = useMessagesStore();
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message")?.toString();
    if (!message) return;

    setIsPostLoading(true);
    const res = await postMessage(message);

    if (res) {
      addMessages([res]);
    }

    setIsPostLoading(false);
    form.reset();
  };

  const handleDeleteAll = async () => {
    setIsDeleteLoading(true);
    await removeMessages();
    setIsDeleteLoading(false);
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

      <div className="flex justify-end gap-2 mt-2">
        <button
          disabled={isPostLoading}
          type="submit"
          className="bg-gray-700 hover:opacity-90 font-medium text-white text-xs md:text-sm rounded-full px-5 py-2 leading-none disabled:opacity-80"
        >
          {isPostLoading ? "Posting..." : "Post"}
        </button>

        <button
          onClick={handleDeleteAll}
          disabled={isDeleteLoading}
          type="button"
          className="border-current text-red-500 font-medium border hover:text-red-400 text-xs md:text-sm rounded-full px-5 py-1.5 leading-none disabled:opacity-80"
        >
          {isDeleteLoading ? "Deleting..." : "Delete All"}
        </button>
      </div>
    </form>
  );
};

export default PostMessageTextBox;
