"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const RedirectButtonInput = ({ data, setData }: any) => {
    const [error, setError] = useState("");

    const handleRedirect = () => {
        const url = data?.fields?.create?.value;

        if (url) {
            window.location.href = url;
        } else {
            setError("No URL provided.");
        }
    };

    return (
        <div className={cn("w-full space-y-2 flex flex-col items-center")}>
            <div className="w-full space-y-2">
                <Label className="text-base font-medium">
                    Name
                </Label>
                <Input
                    type="text"
                    value={data.name}
                    onChange={(e: any) => {
                        setData({
                            ...data,
                            name: e.target.value,
                        });
                    }}
                />
            </div>
            <div className="w-full space-y-2">
                <Label className="text-base font-medium">
                    Value
                </Label>
                <Input
                    type="text"
                    value={data?.fields?.create?.value}
                    onChange={(e: any) => {
                        setData({
                            ...data,
                            fields: {
                                create: {
                                    value: e.target.value,
                                },
                            },
                        });
                    }}
                />
                <Button onClick={handleRedirect} className="mt-4">
                Go to URL
            </Button>
            </div>
            
            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
    );
};
