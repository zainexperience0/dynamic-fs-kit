"use client";
import { selectMetaOptions } from "@/lib/schemas";
import { useState } from "react";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RenderInput } from "./RenderInput";

export const CreateMeta = ({ model, callbackFn, id, page }: any) => {

    const [data, setData] = useState<any>([]);

    const [creating, setCreating] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createFail, setCreateFail] = useState(false);
    const [loading, setLoading] = useState(false);

    const createRecord = () => {
        setCreating(true);
        axios
            .post(`/api/v1/dynamic/${model}`, {
                data_body: data,
                act: "CREATE",
                queryType: "create",
            })
            .then((resp: any) => {
                setCreating(false);
                setCreateSuccess(true);
                setTimeout(() => {
                    resetFields();
                    if (!callbackFn) {
                        window.location.reload();
                    } else {
                        callbackFn();
                    }
                }, 2000);
            })
            .catch((err: any) => {
                console.log(err);
                setCreating(false);
                setCreateFail(true);
            });
    };

    const resetFields = () => {
        setCreating(false);
        setCreateSuccess(false);
        setCreateFail(false);
        setData({
            name: "",
            inputType: "",
            dataType: "",
            isSearchable: false,
            isSortable: false,
        });
    };

    if (!model) {
        return (
            <div className="mt-10 max-w-5xl mx-auto text-center">
                <p className="text-destructive text-2xl font-semibold">
                    Page not found!
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mt-10 max-w-5xl mx-auto text-center">
                <Loader className="mx-auto animate-spin" />
            </div>
        );
    }

    return (
        <div className="my-10 px-4">
            <div className="space-y-6 border p-6">
                <div className="">
                    <div className="flex items-center justify-between">
                        <Label>InputType</Label>
                        <Select
                            value={data.inputType}
                            onValueChange={(e) => {
                                const selectedOption = selectMetaOptions.find(option => option.inputType === e);
                                setData({
                                    ...data,
                                    inputType: e,
                                    dataType: selectedOption?.dataType || "",
                                    Table: {
                                        connect: {
                                            id: id
                                        }
                                    },
                                });
                            }}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select InputType" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectMetaOptions.map(option => (
                                    <SelectItem key={option.inputType} value={option.inputType}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Separator className="my-4" />
                </div>
                <div>
                    <RenderInput data={data} setData={setData} />
                </div>
            </div>
            <Button
                onClick={createRecord}
                disabled={creating || createSuccess || createFail}
                className="flex items-center"
            >
                {creating && <Loader className="h-4 w-4 mr-2 animate-spin" />}
                {!creating && !createSuccess && !createFail && "Submit"}
                {createSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
                {createSuccess && `${data?.name} created!`}
                {createFail && "Failed to create!"}
            </Button>
        </div>
    );
};
