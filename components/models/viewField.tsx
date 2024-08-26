"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Info, Loader, Pencil, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { CreateMeta } from "./Meta/Create";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const ViewField = ({ modelSlug, id }: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post(`/api/v1/dynamic/${modelSlug}`, {
        act: "GET",
        where: {
          id: id
        },
        queryType: "findUnique",
        select: {
          id: true,
          name: true,
          description: true,
          fields: true,
        }
      })
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  }


  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Failed to get data!
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

  if (!data?.id) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <Info className="h-8 w-8 text-muted-foreground" />
          <p className="text-2xl text-muted-foreground">
            This page doesn&apos;t exist!
          </p>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "mt-4")}
          href={`/${prePath}/${modelSlug}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-6 lg:px-8">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${modelSlug}`}>
              {modelSlug}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <p className="text-4xl font-semibold">{data.name}</p>
        <div className="flex flex-row items-center justify-end space-x-2">
          <Link
            href={`/${prePath}/${modelSlug}/edit/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Update
          </Link>
          <Link
            href={`/${prePath}/${modelSlug}/delete/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Link>
        </div>
      </div>
      <Separator className="h-1 w-full my-4" />
      <div className="space-y-6 w-full">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <Table>
              <TableCaption>A list of your Fields</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>inputType</TableHead>
                  <TableHead>dataType</TableHead>
                  <TableHead className="text-right">isSearchable</TableHead>
                  <TableHead className="text-right">isSortable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.fields?.map((field: any) => (
                  <TableRow key={field.id}>
                    <TableCell className="w-[100px]">{field.name}</TableCell>
                    <TableCell>{field.inputType}</TableCell>
                    <TableCell>{field.dataType}</TableCell>
                    <TableCell className="text-right">{field.isSearchable ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">{field.isSortable ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="create">
            <CreateMeta model={"fieldMeta"} id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
