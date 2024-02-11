"use client";
import React, { useEffect } from "react";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { HardBreak } from "@tiptap/extension-hard-break";
import StarterKit from "@tiptap/starter-kit";
import EditorMenubar from "./EditorMenuBar";
import { Codepen } from "react-feather";
import {
  BoldIcon,
  Italic,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  StrikethroughIcon,
} from "lucide-react";

interface EditorProps {
  editorState: string;
  setEditorState: (params: string) => void;
}
const Markdown = ({ editorState, setEditorState }: EditorProps) => {
  const CustomHardBreak = HardBreak.extend({
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => true,
      };
    },
  });
  const editor = useEditor({
    extensions: [StarterKit, CustomHardBreak],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editorState === null || editorState === "") {
      editor?.commands.setContent("");
    }
  }, [editorState, editor?.commands]);

  const BubbleMenuFunctions = [
    {
      title: "bold",
      onFunction: () => editor?.chain().focus().toggleBold().run(),
      icon: <BoldIcon size={16} className="font-bold " />,
    },
    {
      title: "italic",
      onFunction: () => editor?.chain().focus().toggleItalic().run(),
      icon: <Italic size={16} className="font-bold " />,
    },
    {
      title: "strike",
      onFunction: () => editor?.chain().focus().toggleStrike().run(),
      icon: <StrikethroughIcon size={18} className="font-bold " />,
    },
    {
      title: "code",
      onFunction: () => editor?.chain().focus().toggleCode().run(),
      icon: <Code size={18} className="font-bold " />,
    },
    {
      title: "codeBlck",
      onFunction: () => editor?.chain().focus().toggleCodeBlock().run(),
      icon: <Codepen size={16} className="font-bold " />,
    },
  ];

  const FloatingMenuFunctions = [
    {
      title: `heading`,
      attribute: { level: 1 },
      onFunction: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: <Heading1 className="w-4 h-4" />,
    },
    {
      title: `heading`,
      attribute: { level: 2 },
      onFunction: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <Heading2 className="w-4 h-4" />,
    },
    {
      title: `codeBlock`,
      attribute: { level: 1 },
      onFunction: () => editor?.chain().focus().toggleCodeBlock().run(),
      icon: <Codepen className="w-4 h-4" />,
    },
    {
      title: `bulletList`,
      onFunction: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <List className="w-4 h-4" />,
    },
    {
      title: `orderedList`,
      onFunction: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <ListOrdered className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <main className="dark:bg-secondary-light outline-none focus:ring rounded-lg p-3 text-white dark:text-white placholder:text-gray-400 text-lg w-full mb-2 max-w-full ">
        {editor && (
          <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <div className="flex gap-1 bg-white px-4 py-1 text-black rounded-sm">
              {BubbleMenuFunctions.length > 0 &&
                BubbleMenuFunctions.map((func: any, index: number) => (
                  <button
                    key={index}
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      func.onFunction();
                    }}
                    className={
                      editor.isActive(func.title)
                        ? "is-active rounded-sm p-0.5"
                        : " rounded-sm p-0.5"
                    }
                  >
                    {func.icon}
                  </button>
                ))}
            </div>
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <div className="flex gap-1 bg-white px-4 py-1 text-black rounded-sm">
              {FloatingMenuFunctions.length > 0 &&
                FloatingMenuFunctions.map((func: any, index: number) => (
                  <button
                    key={index}
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      func.onFunction();
                    }}
                    className={
                      editor.isActive(func.title, func.attribute)
                        ? "is-active rounded-sm p-0.5"
                        : "rounded-sm p-0.5"
                    }
                  >
                    {func.icon}
                  </button>
                ))}
            </div>
          </FloatingMenu>
        )}

        {editor && <EditorMenubar editor={editor} />}

        <EditorContent className="prose dark:prose-invert mt-4" editor={editor} />
      </main>
    </>
  );
};
export default Markdown;
