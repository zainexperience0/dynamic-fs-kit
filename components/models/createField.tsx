"use client";
import { prePath } from "@/lib/schemas";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle, Loader } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const CreateField = ({ model, callbackFn, page }: any) => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const createRecord = () => {
    setCreating(true);
    axios
      .post(`/api/v1/dynamic/${model}`, {
        data_body: data,
        act: "POST",
        queryType: "create",
      })
      .then((resp: any) => {
        setCreating(false);
        setCreateSuccess(true);
        setTimeout(() => {
          resetFields();
          if (!callbackFn) {
            window.history.back();
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
    setData({ name: "", description: "" });
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
    <div className="max-w-3xl mx-auto my-10 px-4">
      {page && (
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${prePath}/${model}`}>
                {model}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create {model}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mt-1 block w-full"
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label htmlFor="description" className="block text-sm font-medium">
            Description
          </Label>
          <Input
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="mt-1 block w-full"
            placeholder="Enter description"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
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
      </div>
    </div>
  );
};
