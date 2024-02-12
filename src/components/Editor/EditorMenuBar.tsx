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
      title: "bold",
      onFunction: () => editor.chain().focus().toggleBold().run(),
      offFunction: () => !editor.can().chain().focus().toggleBold().run(),
      icon: Bold,
    },
    {
      title: "italic",
      onFunction: () => editor.chain().focus().toggleItalic().run(),
      offFunction: () => !editor.can().chain().focus().toggleItalic().run(),
      icon: Italic,
    },
    {
      title: "strike",
      onFunction: () => editor.chain().focus().toggleStrike().run(),
      offFunction: () => !editor.can().chain().focus().toggleStrike().run(),
      icon: Strikethrough,
    },
    {
      title: "code",
      onFunction: () => editor.chain().focus().toggleCode().run(),
      offFunction: () => !editor.can().chain().focus().toggleCode().run(),
      icon: Code,
    },
    {
      title: `heading`,
      attribute: { level: 1 },
      onFunction: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      icon: Heading1,
    },
    {
      title: "heading",
      attribute: { level: 2 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Heading2,
    },
    {
      title: "heading",
      attribute: { level: 3 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Heading3,
    },
    {
      title: "heading",
      attribute: { level: 4 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 4 }).run(),
      icon: Heading4,
    },
    {
      title: "heading",
      attribute: { level: 5 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 5 }).run(),
      icon: Heading5,
    },
    {
      title: "heading",
      attribute: { level: 6 } || null,
      onFunction: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      offFunction: () => !editor.can().chain().focus().toggleHeading({ level: 6 }).run(),
      icon: Heading6,
    },
    {
      title: "bulletList",
      onFunction: () => editor.chain().focus().toggleBulletList().run(),
      offFunction: () => !editor.can().chain().focus().toggleBulletList().run(),
      icon: List,
    },
    {
      title: "orderedList",
      onFunction: () => editor.chain().focus().toggleOrderedList().run(),
      offFunction: () => !editor.can().chain().focus().toggleOrderedList().run(),
      icon: ListOrdered,
    },
    {
      title: "codeBlock",
      onFunction: () => editor.chain().focus().toggleCodeBlock().run(),
      offFunction: () => !editor.can().chain().focus().toggleCodeBlock().run(),
      icon: Codepen,
    },
    {
      title: "blockquote",
      onFunction: () => editor.chain().focus().toggleBlockquote().run(),
      offFunction: () => !editor.can().chain().focus().toggleBlockquote().run(),
      icon: Quote,
    },
    {
      title: "undo",
      onFunction: () => editor.chain().focus().undo().run(),
      offFunction: () => !editor.can().chain().focus().undo().run(),
      icon: Undo,
    },
    {
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
          MenuBarFunctions.map((menu: any, index: number) => (
            <button
              key={index}
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
