import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const UrlInput = ({ data, setData }: any) => {
    const [error, setError] = useState("");
    const [helperText, setHelperText] = useState("");

    const validateUrl = (url: string) => {
        const urlPattern =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return urlPattern.test(url);
    };

    const handleUrlChange = (e: any) => {
        const url = e.target.value;
        if (validateUrl(url)) {
            setError("");
            setHelperText("Valid URL");
            setData({
                ...data,
                fields: {
                    create: {
                        value: url,
                    },
                },
            });
        } else {
            setError("Invalid URL");
            setHelperText("Please enter a valid URL.");
        }
    };

    return (
        <div className="mx-auto">
            <div className="space-y-6 border rounded-lg p-6">
                <div>
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <Label>URL</Label>
                    <Input
                        value={data.url || ""}
                        onChange={handleUrlChange}
                        className={error ? "border-red-500" : ""}
                    />
                    {helperText && (
                        <p className={`text-sm mt-1 ${error ? "text-red-500" : "text-green-500"}`}>
                            {helperText}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Label>Is Searchable</Label>
                    <Switch
                        checked={data.isSearchable}
                        onCheckedChange={(e) =>
                            setData({
                                ...data,
                                isSearchable: e,
                            })
                        }
                        className="ml-2"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Label>Is Sortable</Label>
                    <Switch
                        checked={data.isSortable}
                        onCheckedChange={(e) =>
                            setData({
                                ...data,
                                isSortable: e,
                            })
                        }
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );
};
