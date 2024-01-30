import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Codepen } from "react-feather";

const EditorMenubar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading4 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading5 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Heading6 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Codepen className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
            : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
        }
      >
        <Quote className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default EditorMenubar;
