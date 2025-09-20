import React, { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

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
    align: "left",
    fontSize: "16",
  });

  // Update tombol aktif berdasarkan seleksi
  useEffect(() => {
    const updateActiveFormats = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          const isHeading1 = nodes.some(
            (node) => $isHeadingNode(node) && node.getTag() === "h1"
          );
          const isHeading2 = nodes.some(
            (node) => $isHeadingNode(node) && node.getTag() === "h2"
          );
          const isHeading3 = nodes.some(
            (node) => $isHeadingNode(node) && node.getTag() === "h3"
          );

          setActiveFormats((prev) => ({
            ...prev,
            bold: selection.hasFormat("bold"),
            italic: selection.hasFormat("italic"),
            underline: selection.hasFormat("underline"),
            heading1: isHeading1,
            heading2: isHeading2,
            heading3: isHeading3,
          }));
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
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    setActiveFormats((prev) => ({
      ...prev,
      bulletList: true,
      orderedList: false,
    }));
  };

  const formatOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    setActiveFormats((prev) => ({
      ...prev,
      bulletList: false,
      orderedList: true,
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

  const formatAlign = (align) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align);
    setActiveFormats((prev) => ({ ...prev, align }));
  };

  const applyFontSize = (size) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node.setStyle) {
            node.setStyle(`font-size: ${size}px`);
          }
        });
      }
    });
    setActiveFormats((prev) => ({ ...prev, fontSize: size }));
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 rounded-t-md p-2 flex flex-wrap space-x-2">
      {/* Bold / Italic / Underline */}
      <button
        type="button"
        onClick={() => formatText("bold")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.bold ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => formatText("italic")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.italic ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Italic"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        onClick={() => formatText("underline")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.underline ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Underline"
      >
        <u>U</u>
      </button>

      {/* List */}
      <button
        type="button"
        onClick={formatBulletList}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.bulletList ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Bullet List"
      >
        •
      </button>
      <button
        type="button"
        onClick={formatOrderedList}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.orderedList ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Ordered List"
      >
        1.
      </button>

      {/* Headings */}
      <button
        type="button"
        onClick={() => formatHeading(1)}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.heading1 ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => formatHeading(2)}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.heading2 ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading(3)}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.heading3 ? "bg-cyan-600 text-white" : "text-gray-700"
          }`}
        title="Heading 3"
      >
        H3
      </button>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => formatAlign("left")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.align === "left"
          ? "bg-cyan-600 text-white"
          : "text-gray-700"
          }`}
        title="Align Left"
      >
        ⬅
      </button>
      <button
        type="button"
        onClick={() => formatAlign("center")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.align === "center"
          ? "bg-cyan-600 text-white"
          : "text-gray-700"
          }`}
        title="Align Center"
      >
        ⬌
      </button>
      <button
        type="button"
        onClick={() => formatAlign("right")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.align === "right"
          ? "bg-cyan-600 text-white"
          : "text-gray-700"
          }`}
        title="Align Right"
      >
        ➡
      </button>
      <button
        type="button"
        onClick={() => formatAlign("justify")}
        className={`px-2 py-1 rounded hover:bg-gray-200 ${activeFormats.align === "justify"
          ? "bg-cyan-600 text-white"
          : "text-gray-700"
          }`}
        title="Justify"
      >
        ☰
      </button>

      {/* Font size */}
      <select
        value={activeFormats.fontSize}
        onChange={(e) => applyFontSize(e.target.value)}
        className="ml-2 border rounded px-1 text-gray-700"
      >
        <option value="12">12px</option>
        <option value="14">14px</option>
        <option value="16">16px</option>
        <option value="18">18px</option>
        <option value="24">24px</option>
        <option value="32">32px</option>
      </select>
    </div>
  );
};

export default ToolbarPlugin;
