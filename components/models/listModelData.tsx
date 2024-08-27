"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prePath } from "@/lib/schemas";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Loader, MoveRight, Pencil, Plus, Trash } from "lucide-react";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { Badge } from "../ui/badge";
import axios from "axios";
export const ListModelData = ({ modelSlug }: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<any>({});

  useEffect(() => {
    axios.post(`/api/v1/dynamic/${modelSlug}`, {
      queryType: "findMany",
      act: "GET"
    }).then((resp: any) => {
      setData(resp.data);
      setLoading(false);
    })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [])

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
    <div className="mt-10 max-w-5xl mx-auto px-2">
      {model && (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <p className="text-5xl  font-semibold capitalize">{model.name}</p>

          </div>
          <Link
            href={`/${prePath}/${modelSlug}/create`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      )}

      <div className="my-10 space-y-4">
        {data?.map((item: any) => (
          <Fragment key={item.id}>
            <Card key={item.id}>
              <CardHeader className="group flex flex-row justify-between items-start">
                <Link
                  className="flex flex-col space-y-2 cursor-pointer w-full"
                  href={`/${prePath}/${modelSlug}/view/${item.id}`}
                >
                  <CardTitle className="capitalize flex flex-row space-x-2 group-hover:underline">
                    <span>{item.name}</span>
                    <MoveRight className=" opacity-75" />
                  </CardTitle>
                  <CardDescription className=" line-clamp-3 ">
                    {item.description}
                  </CardDescription>
                </Link>

                <div className="flex flex-row items-center justify-end space-x-2">
                  <Link
                    href={`/${prePath}/${modelSlug}/edit/${item.id}`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" })
                    )}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${prePath}/${modelSlug}/delete/${item.id}?deletekey=title`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" })
                    )}
                  >
                    <Trash className="h-4 w-4" />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </Fragment>
        ))}
      </div>

    </div>
  );
};