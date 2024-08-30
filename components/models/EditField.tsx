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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const EditField = ({ model, id, callbackFn }: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);

  const updateRecord = () => {
    setEditing(true);
    axios
      .post(`/api/v1/dynamic/${model}`, {
        data_body: {
          name: data.name,
          description: data.description,
          config: data.config,
        },
        where: {
          id: id,
        },
        act: "UPDATE",
        queryType: "update",
      })
      .then(() => {
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
        where: {
          id: id,
          fields: {
            some: {
              fieldFind: {
                canFindOnUpdate: true
              }
            }
          }
        },
        select: {
          id: true,
          name: true,
          config: true,
          description: true,
          fields: {
            select: {
              name: true,
              id: true,
            },
            where: {
              isSearchable: true,
              isSortable: true,
            }
          },
        },
        act: "GET",
        queryType: "findUnique",
      })
      .then((resp: any) => {
        const fetchedData = resp.data;
        const initialConfig = fetchedData.config || {};

        setData({
          ...fetchedData,
          config: {
            ...initialConfig,
            defaultSortField: initialConfig.defaultSortField || "",
            listTitle: initialConfig.listTitle || "",
            listDescription: initialConfig.listDescription || "",
            searchFields: initialConfig.searchFields || [],
          },
        });

        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-red-600 text-xl font-semibold">Page not found!</p>
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
        <Loader className="mx-auto animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${model}`}>{data.name}</BreadcrumbLink>
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

        {data.fields.length > 0 && (
          <div className="space-y-6 border rounded-md p-2">
            <Label className="block text-sm font-medium">Config</Label>
            <div>
              <Label className="block text-sm font-medium">Default sort field</Label>
              <Select
                value={data.config.defaultSortField}
                onValueChange={(e) => setData({ ...data, config: { ...data.config, defaultSortField: e } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select default sort field" />
                </SelectTrigger>
                <SelectContent>
                  {data.fields.map((field: any) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium">List title</Label>
              <Select
                value={data.config.listTitle}
                onValueChange={(e) => setData({ ...data, config: { ...data.config, listTitle: e } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select list title" />
                </SelectTrigger>
                <SelectContent>
                  {data.fields.map((field: any) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium">List description</Label>
              <Select
                value={data.config.listDescription}
                onValueChange={(e) => setData({ ...data, config: { ...data.config, listDescription: e } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select list description" />
                </SelectTrigger>
                <SelectContent>
                  {data.fields.map((field: any) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium">Search fields</Label>
              <ToggleGroup
                value={data.config.searchFields}
                onValueChange={(e) =>
                  setData({ ...data, config: { ...data.config, searchFields: e } })
                }
                type="multiple"
              >
                {data.fields.map((field: any) => (
                  <ToggleGroupItem key={field.id} value={field.id}>
                    {field.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Button
          onClick={updateRecord}
          disabled={editing || editFail || editSuccess}
          className={`w-full flex items-center justify-center px-4 py-2 font-medium text-white rounded-md focus:outline-none ${editing ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
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
