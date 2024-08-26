"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { CheckCircle, Loader, AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const EditField = ({ model, id, callbackFn }: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);

  const updateRecord = () => {
    const requiredFields = model.fields?.filter(
      (field: any) => field.required && field.dataType !== "relation"
    );

    if (requiredFields?.length > 0) {
      const isEmptyRecord = requiredFields.find(
        (field: any) =>
          data[field.name] === undefined || data[field.name] === ""
      );
      if (isEmptyRecord) {
        alert(`Please fill all required fields: ${requiredFields?.map((field: any) => field.name).join(', ')}`);
        return;
      }
    }

    setEditing(true);
    axios
      .post(`/api/v1/dynamic/${model}`, {
        data_body: data,
        act: "UPDATE",
        where: {
          id: id,
        },
        queryType: "update",
      })
      .then((resp: any) => {
        setEditing(false);
        setEditSuccess(true);
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
        setEditing(false);
        setEditFail(true);
      });
  };

  const resetFields = () => {
    setEditing(false);
    setEditSuccess(false);
    setEditFail(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(`/api/v1/dynamic/${model}`, {
        act: "GET",
        where: {
          id: id,
        },
        queryType: "findUnique",
        select: {
          name: true,
          description: true,
        },
      })
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-red-600 text-xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <AlertCircle className="mx-auto text-red-600" size={48} />
        <p className="text-red-600 text-xl font-semibold mt-4">
          Failed to get data!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <Loader className="mx-auto animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${model}`}>
              {data.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit {data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mt-1"
            placeholder="Enter name"
          />
        </div>

        <div>
          <Label htmlFor="description" className="block text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="mt-1 block w-full"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={updateRecord}
          disabled={editing || editFail || editSuccess}
          className={`w-full flex items-center justify-center px-4 py-2 font-medium text-white rounded-md focus:outline-none ${editing ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {editing && <Loader className="h-4 w-4 mr-2 animate-spin" />}
          {editing && "Saving..."}
          {!editing && !editSuccess && !editFail && "Save changes"}
          {editSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
          {editSuccess && `${data.name} saved!`}
          {editFail && "Failed to update!"}
        </Button>
      </div>
    </div>
  );
};
