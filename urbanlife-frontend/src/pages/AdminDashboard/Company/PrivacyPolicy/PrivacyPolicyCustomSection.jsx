import React, { Component } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import ToolbarPlugin from "./ToolbarPlugin";

const theme = {
  paragraph: "text-slate-700 leading-relaxed mb-2",
  heading: {
    h1: "text-2xl font-semibold text-slate-900 mb-3",
    h2: "text-xl font-semibold text-slate-900 mb-2",
    h3: "text-lg font-semibold text-slate-900 mb-2",
  },
  list: {
    ul: "list-disc pl-6 space-y-2 text-slate-700",
    ol: "list-decimal pl-6 space-y-2 text-slate-700",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  link: "text-cyan-600 hover:underline",
};

// Error Boundary untuk menangkap error di LexicalComposer
class LexicalErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 text-sm">
          Error loading editor. Please refresh or try again.
        </div>
      );
    }
    return this.props.children;
  }
}

const PrivacyPolicyCustomSection = ({
  id,
  isActive,
  sectionData = {
    section: "",
    content_en: "",
    content_id: "",
  },
  sectionIndex,
  handleChange,
  onRemove,
}) => {
  const { section = "", content_en = "", content_id = "" } = sectionData;

  const onChange = (editorState, field) => {
    editorState.read(() => {
      const json = JSON.stringify(editorState);
      handleChange(sectionIndex, field, json);
    });
  };

  // Validasi editorState untuk mencegah error JSON.parse
  const getValidEditorState = (state) => {
    if (!state || state === "") return null; // Gunakan null untuk state default
    try {
      JSON.parse(state);
      return state;
    } catch {
      return null; // Return null jika JSON tidak valid
    }
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Section <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            value={section}
            onChange={(e) => handleChange(sectionIndex, "section", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
            required
            placeholder="e.g. Personal Info, Usage"
          />
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            aria-label="Remove section"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* English Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7V2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              English Content
            </h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy Content (EN) <span className="text-red-500">*</span>
              </label>
              <LexicalErrorBoundary>
                <LexicalComposer
                  initialConfig={{
                    namespace: `EnglishEditor-${sectionIndex}`,
                    theme,
                    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
                    onError: (error) => console.error(error),
                    editorState: getValidEditorState(content_en),
                  }}
                >
                  <ToolbarPlugin />
                  <RichTextPlugin
                    contentEditable={
                      <div className="relative">
                        <ContentEditable className="border border-gray-300 rounded-b-md p-3 min-h-[200px] focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                      </div>
                    }
                    placeholder={
                      <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                        Enter Privacy Policy content in English...
                      </div>
                    }
                    onChange={(editorState) => onChange(editorState, "content_en")}
                  />
                  <HistoryPlugin />
                  <ListPlugin />
                  <LinkPlugin />
                </LexicalComposer>
              </LexicalErrorBoundary>
              {content_en === "" && (
                <p className="text-red-500 text-xs mt-1">Content is required.</p>
              )}
            </div>
          </div>
          {/* Indonesian Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7V2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              Indonesian Content
            </h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy Content (ID) <span className="text-red-500">*</span>
              </label>
              <LexicalErrorBoundary>
                <LexicalComposer
                  initialConfig={{
                    namespace: `IndonesianEditor-${sectionIndex}`,
                    theme,
                    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
                    onError: (error) => console.error(error),
                    editorState: getValidEditorState(content_id),
                  }}
                >
                  <ToolbarPlugin />
                  <RichTextPlugin
                    contentEditable={
                      <div className="relative">
                        <ContentEditable className="border border-gray-300 rounded-b-md p-3 min-h-[200px] focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                      </div>
                    }
                    placeholder={
                      <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                        Masukkan konten Privacy Policy dalam bahasa Indonesia...
                      </div>
                    }
                    onChange={(editorState) => onChange(editorState, "content_id")}
                  />
                  <HistoryPlugin />
                  <ListPlugin />
                  <LinkPlugin />
                </LexicalComposer>
              </LexicalErrorBoundary>
              {content_id === "" && (
                <p className="text-red-500 text-xs mt-1">Content is required.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyCustomSection;