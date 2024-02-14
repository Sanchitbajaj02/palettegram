import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
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
  const MenuBarFunctions = [
    {
      id: 1,
      title: "bold",
      onFunction: () => editor.chain().focus().toggleBold().run(),
      offFunction: () => !editor.can().chain().focus().toggleBold().run(),
      icon: Bold,
    },
    {
      id: 2,
      title: "italic",
      onFunction: () => editor.chain().focus().toggleItalic().run(),
      offFunction: () => !editor.can().chain().focus().toggleItalic().run(),
      icon: Italic,
    },
    {
      id: 3,
      title: "strike",
      onFunction: () => editor.chain().focus().toggleStrike().run(),
      offFunction: () => !editor.can().chain().focus().toggleStrike().run(),
      icon: Strikethrough,
    },
    {
      id: 4,

      title: "code",
      onFunction: () => editor.chain().focus().toggleCode().run(),
      offFunction: () => !editor.can().chain().focus().toggleCode().run(),
      icon: Code,
    },
    {
      id: 5,

      title: `heading`,
      attribute: { level: 1 },
      onFunction: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      icon: Heading1,
    },
    {
      id: 6,

      title: "heading",
      attribute: { level: 2 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Heading2,
    },
    {
      id: 7,

      title: "heading",
      attribute: { level: 3 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Heading3,
    },
    {
      id: 8,

      title: "heading",
      attribute: { level: 4 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 4 }).run(),
      icon: Heading4,
    },
    {
      id: 9,
      title: "heading",
      attribute: { level: 5 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 5 }).run(),
      icon: Heading5,
    },
    {
      id: 10,

      title: "heading",
      attribute: { level: 6 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 6 }).run(),
      icon: Heading6,
    },
    {
      id: 11,

      title: "bulletList",
      onFunction: () => editor.chain().focus().toggleBulletList().run(),
      offFunction: () => !editor.can().chain().focus().toggleBulletList().run(),
      icon: List,
    },
    {
      id: 12,

      title: "orderedList",
      onFunction: () => editor.chain().focus().toggleOrderedList().run(),
      offFunction: () => !editor.can().chain().focus().toggleOrderedList().run(),
      icon: ListOrdered,
    },
    {
      id: 13,

      title: "codeBlock",
      onFunction: () => editor.chain().focus().toggleCodeBlock().run(),
      offFunction: () => !editor.can().chain().focus().toggleCodeBlock().run(),
      icon: Codepen,
    },
    {
      id: 14,

      title: "blockquote",
      onFunction: () => editor.chain().focus().toggleBlockquote().run(),
      offFunction: () => !editor.can().chain().focus().toggleBlockquote().run(),
      icon: Quote,
    },
    {
      id: 15,

      title: "undo",
      onFunction: () => editor.chain().focus().undo().run(),
      offFunction: () => !editor.can().chain().focus().undo().run(),
      icon: Undo,
    },
    {
      id: 16,

      title: "redo",
      onFunction: () => editor.chain().focus().redo().run(),
      offFunction: () => !editor.can().chain().focus().redo().run(),
      icon: Redo,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {MenuBarFunctions.length > 0 &&
          MenuBarFunctions.map((menu) => (
            <button
              key={menu.id}
              role="button"
              onClick={(e) => {
                e.preventDefault();
                menu.onFunction();
                console.log("cick");
              }}
              disabled={!menu.offFunction}
              className={
                editor.isActive(menu.title, menu.attribute)
                  ? "is-active rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
                  : "rounded-sm p-0.5 hover:bg-white/80 hover:text-black"
              }
            >
              <menu.icon className="w-4 h-4" />
            </button>
          ))}
      </div>
    </>
  );
};

export default EditorMenubar;
