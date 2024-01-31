"use client";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import parse from "html-react-parser";
import { Heading1, Heading2, Heading3, List, ListOrdered } from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, Code, CodeSquare, Italic, StrikethroughIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditorMenubar from "./EditorMenuBar";
import { Codepen } from "react-feather";

interface EditorProps {
  editorState: string;
  setEditorState: (params: string) => void;
}
const Markdown = ({ editorState, setEditorState }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editorState === null || editorState === "") {
      editor?.commands.setContent("");
    }
  }, [editorState]);

  return (
    <>
      <main className="dark:bg-secondary-light outline-none focus:ring rounded-lg p-3 text-white dark:text-white placholder:text-gray-400 text-lg w-full mb-2 max-w-full ">
        {editor && (
          <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <div className="flex gap-1 bg-white px-4 py-1 text-black rounded-sm">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <BoldIcon size={16} className="font-bold " />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                  editor.isActive("italic") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <Italic size={18} className="font-bold " />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={
                  editor.isActive("strike") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <StrikethroughIcon size={18} className="font-bold " />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={
                  editor.isActive("strike") ? "is-active rounded-sm p-0.5" : "rounded-sm p-0.5"
                }
              >
                <Code size={18} className="font-bold " />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={
                  editor.isActive("codeBlock") ? "is-active rounded-sm p-0.5" : "rounded-sm p-0.5"
                }
              >
                <CodeSquare size={18} className="font-bold " />
              </button>
            </div>
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
            <div className="flex gap-1 bg-white px-4 py-1 text-black rounded-sm">
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "is-active rounded-sm p-0.5"
                    : "rounded-sm p-0.5"
                }
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "is-active rounded-sm p-0.5"
                    : "rounded-sm p-0.5"
                }
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={
                  editor.isActive("bulletList") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <Codepen className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                  editor.isActive("bulletList") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                  editor.isActive("bulletList") ? "is-active rounded-sm p-0.5" : " rounded-sm p-0.5"
                }
              >
                <ListOrdered className="w-4 h-4" />
              </button>
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
