"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
    data: {
        name: string;
        isSearchable: boolean;
        isSortable: boolean;
        fields?: {
            create?: {
                value?: string;
            };
        };
    };
    setData: (newData: any) => void;
}

export const TagInput = ({ data, setData }: TagInputProps) => {
    const [tags, setTags] = React.useState<string[]>([]);
    const [pendingTag, setPendingTag] = React.useState("");

    const updateTags = (newTags: string[]) => {
        setTags(newTags);
        setData({
            ...data,
            fields: {
                create: {
                    value: JSON.stringify(newTags),
                },
            },
        });
    };

    React.useEffect(() => {
        if (pendingTag.includes(",")) {
            const newTags = Array.from(
                new Set([...tags, ...pendingTag.split(",").map((tag) => tag.trim())])
            );
            updateTags(newTags);
            setPendingTag("");
        }
    }, [pendingTag]);

    const addPendingTag = () => {
        if (pendingTag) {
            const newTags = Array.from(new Set([...tags, pendingTag]));
            updateTags(newTags);
            setPendingTag("");
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            <div className="space-y-6 border rounded-lg p-6">
                <div>
                    <Label className="text-lg font-semibold">Name</Label>
                    <Input
                        className="mt-1"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder="Enter a name"
                    />
                </div>

                <div>
                    <Label className="text-lg font-semibold">Tags</Label>
                    <div
                        className={cn(
                            "border px-2 rounded-md flex flex-row items-center space-x-2 mt-2"
                        )}
                    >
                        {tags.map((item) => (
                            <Badge
                                key={item}
                                variant="secondary"
                                className="rounded text-sm font-light flex items-center"
                            >
                                {item}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2 h-3 w-3"
                                    onClick={() => {
                                        const newTags = tags.filter((i) => i !== item);
                                        updateTags(newTags);
                                    }}
                                >
                                    <X className="w-3" />
                                </Button>
                            </Badge>
                        ))}
                        <Input
                            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                            value={pendingTag}
                            onChange={(e) => setPendingTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    addPendingTag();
                                } else if (
                                    e.key === "Backspace" &&
                                    pendingTag.length === 0 &&
                                    tags.length > 0
                                ) {
                                    e.preventDefault();
                                    const newTags = tags.slice(0, -1);
                                    updateTags(newTags);
                                }
                            }}
                            placeholder="Type a tag and press Enter"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Is Searchable</Label>
                    <Switch
                        checked={data.isSearchable}
                        onCheckedChange={(e) => setData({ ...data, isSearchable: e })}
                        className="ml-2"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Is Sortable</Label>
                    <Switch
                        checked={data.isSortable}
                        onCheckedChange={(e) => setData({ ...data, isSortable: e })}
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );
};
