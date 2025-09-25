import React, { Component, useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";

import ToolbarPlugin from "../PrivacyPolicy/ToolbarPlugin";

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

const TermsAndConditionsHeroSection = ({
  id,
  isActive,
  formData,
  handleChange,
  isEditMode
}) => {
  const { title_en, title_id, subtitle_en, subtitle_id } = formData || {};

  const [isEditorReady, setIsEditorReady] = useState(false);
  
  if(isEditMode) {
    useEffect(() => {
      if (subtitle_en || subtitle_id) {
        setIsEditorReady(true);
      }
    }, [subtitle_en, subtitle_id]);

    if (!isEditorReady) {
      return <div>Loading...</div>;
    }
  }

  const onChange = (editorState, field) => {
    editorState.read(() => {
      const json = JSON.stringify(editorState);
      handleChange(field, json);
    });
  };

  const getValidEditorState = (state) => {
    if (!state || state === "") return null;
    try {
      JSON.parse(state);
      return state;
    } catch {
      return null;
    }
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
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
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              English Content
            </h3>

            <div className="space-y-4">
              {/* title - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={title_en ?? ""}
                  onChange={(e) => handleChange("title_en", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              {/* subtitle - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle (EN) <span className="text-red-500">*</span>
                </label>
                {/* <textarea
                  name="subtitle_en"
                  value={subtitle_en ?? ""}
                  onChange={(e) => handleChange("subtitle_en", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                /> */}
                <LexicalErrorBoundary>
                  <LexicalComposer
                    initialConfig={{
                      namespace: "EnglishEditor",
                      theme,
                      nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
                      onError: (error) => console.error(error),
                      editorState: getValidEditorState(subtitle_en),
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
                          Enter Terms and Condition content in English...
                        </div>
                      }
                    />
                    <OnChangePlugin
                      onChange={(editorState) => onChange(editorState, "subtitle_en")}
                    />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                  </LexicalComposer>
                </LexicalErrorBoundary>
              </div>
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
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              Indonesian Content
            </h3>

            <div className="space-y-4">
              {/* title - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={title_id ?? ""}
                  onChange={(e) => handleChange("title_id", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              {/* subtitle - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle (ID) <span className="text-red-500">*</span>
                </label>
                {/* <textarea
                  name="subtitle_id"
                  value={subtitle_id ?? ""}
                  onChange={(e) => handleChange("subtitle_id", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                /> */}
                <LexicalErrorBoundary>
                  <LexicalComposer
                    initialConfig={{
                      namespace: "IndonesianEditor",
                      theme,
                      nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
                      onError: (error) => console.error(error),
                      editorState: getValidEditorState(subtitle_id),
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
                    />
                    {/* OnChange untuk Indonesian */}
                    <OnChangePlugin
                      onChange={(editorState) => onChange(editorState, "subtitle_id")}
                    />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                  </LexicalComposer>
                </LexicalErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsHeroSection;