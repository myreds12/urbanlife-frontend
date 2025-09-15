import React, { Component } from "react";
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

// Error Boundary untuk LexicalComposer
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

const PrivacyPolicyContentSection = ({
  id,
  isActive,
  formData = {
    content_en: "",
    content_id: "",
  },
  handleChange,
}) => {
  const { content_en = "", content_id = "" } = formData;

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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* English Content */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              English Content
            </h3>
            <LexicalErrorBoundary>
              <LexicalComposer
                initialConfig={{
                  namespace: "EnglishEditor",
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
                />
                {/* OnChange untuk English */}
                <OnChangePlugin
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

          {/* Indonesian Content */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              Indonesian Content
            </h3>
            <LexicalErrorBoundary>
              <LexicalComposer
                initialConfig={{
                  namespace: "IndonesianEditor",
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
                />
                {/* OnChange untuk Indonesian */}
                <OnChangePlugin
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
  );
};

export default PrivacyPolicyContentSection;
