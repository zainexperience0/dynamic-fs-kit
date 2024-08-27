import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React, { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export const MarkdownInput = ({ data, setData }: any) => {
    const [editorHeight, setEditorHeight] = useState(300);


  const handleEditorChange = ({ text }: any) => {
    setData({ ...data, 
        fields: {
            create: {
                value: text,
            },
        }
     });
  };
    return (
        <div className="mx-auto">
            <div className="space-y-6 border rounded-lg p-6">
                <div>
                    <Label>
                        Name
                    </Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value,
                        })}
                    />
                </div>
                <div>
                    <Label>
                        Value
                    </Label>
                    <ResizableBox
        width={Infinity}
        height={editorHeight}
        minConstraints={[300, 300]}
        maxConstraints={[Infinity, 1000]}
        onResizeStop={(e, data) => setEditorHeight(data.size.height)}
        resizeHandles={["s"]}
      >
        <MdEditor
          value={data.value}
          style={{ height: "100%" }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
            },
            canView: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
              both: true,
            },
            imageUrl: "https://octodex.github.com/images/minion.png", // Example image URL for the image plugin
            syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
          }}
          // Adding all possible plugins
          plugins={[
            "header",
            "font-bold",
            "font-italic",
            "font-underline",
            "font-strikethrough",
            "list-unordered",
            "list-ordered",
            "block-quote",
            "block-code-inline",
            "block-code-block",
            "table",
            "link",
            "image",
            "emoji",
            "clear",
            "logger",
            "mode-toggle",
            "full-screen",
            "drag-drop",
          ]}
        />
      </ResizableBox>
                </div>

                <div className="flex items-center justify-between">
                    <Label>
                        Is Searchable
                    </Label>
                    <Switch
                        checked={data.isSearchable}
                        onCheckedChange={(e) => setData({
                            ...data,
                            isSearchable: e,
                        })}
                        className="ml-2"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Label>
                        Is Sortable
                    </Label>
                    <Switch
                        checked={data.isSortable}
                        onCheckedChange={(e) => setData({
                            ...data,
                            isSortable: e,
                        })}
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );
};
