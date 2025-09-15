import React, { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, $getNodeByKey } from "lexical";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $createListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    orderedList: false,
    heading1: false,
    heading2: false,
    heading3: false,
  });

  // Update tombol aktif berdasarkan seleksi
  useEffect(() => {
    const updateActiveFormats = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          const isHeading1 = nodes.some((node) => $isHeadingNode(node) && node.getTag() === "h1");
          const isHeading2 = nodes.some((node) => $isHeadingNode(node) && node.getTag() === "h2");
          const isHeading3 = nodes.some((node) => $isHeadingNode(node) && node.getTag() === "h3");

          setActiveFormats({
            bold: selection.hasFormat("bold"),
            italic: selection.hasFormat("italic"),
            underline: selection.hasFormat("underline"),
            bulletList: false, // Tidak bisa cek langsung, diatur saat klik
            orderedList: false,
            heading1: isHeading1,
            heading2: isHeading2,
            heading3: isHeading3,
          });
        }
      });
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateActiveFormats();
      });
    });
  }, [editor]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    setActiveFormats((prev) => ({ ...prev, [format]: !prev[format] }));
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    setActiveFormats((prev) => ({
      ...prev,
      bulletList: true,
      orderedList: false,
      heading1: false,
      heading2: false,
      heading3: false,
    }));
  };

  const formatOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    setActiveFormats((prev) => ({
      ...prev,
      bulletList: false,
      orderedList: true,
      heading1: false,
      heading2: false,
      heading3: false,
    }));
  };

  const formatHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const headingNode = $createHeadingNode(`h${level}`);
        selection.insertNodes([headingNode]);
        setActiveFormats((prev) => ({
          ...prev,
          heading1: level === 1,
          heading2: level === 2,
          heading3: level === 3,
          bulletList: false,
          orderedList: false,
        }));
      }
    });
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 rounded-t-md p-2 flex space-x-2">
      <button
        type="button"
        onClick={() => formatText("bold")}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.bold ? "bg-cyan-600 text-white" : ""
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => formatText("italic")}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.italic ? "bg-cyan-600 text-white" : ""
        }`}
        title="Italic"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        onClick={() => formatText("underline")}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.underline ? "bg-cyan-600 text-white" : ""
        }`}
        title="Underline"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={formatBulletList}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.bulletList ? "bg-cyan-600 text-white" : ""
        }`}
        title="Bullet List"
      >
        •
      </button>
      <button
        type="button"
        onClick={formatOrderedList}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.orderedList ? "bg-cyan-600 text-white" : ""
        }`}
        title="Ordered List"
      >
        1.
      </button>
      <button
        type="button"
        onClick={() => formatHeading(1)}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.heading1 ? "bg-cyan-600 text-white" : ""
        }`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => formatHeading(2)}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.heading2 ? "bg-cyan-600 text-white" : ""
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading(3)}
        className={`px-2 py-1 rounded text-gray-700 hover:bg-gray-200 transition-colors ${
          activeFormats.heading3 ? "bg-cyan-600 text-white" : ""
        }`}
        title="Heading 3"
      >
        H3
      </button>
    </div>
  );
};

export default ToolbarPlugin;