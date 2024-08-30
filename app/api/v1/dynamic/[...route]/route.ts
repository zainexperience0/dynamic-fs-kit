import { prismaInstance } from "@/lib/prismaInit";
import { NextRequest, NextResponse } from "next/server";

// POST
// baseurl/api/v1/dynamic/model_name      create a record or handle other operations
export async function POST(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const data_0 = await req.json();
  const { where, data_body, act, queryType, isAuth, select } = data_0;

  //GET
  if (act === "GET") {
    try {
      const data = await prismaInstance[model_name][queryType]({
        where: where,
        select: select,
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else if (act === "CREATE") {
    try {
      const data = await prismaInstance[model_name][queryType]({
        data: data_body,
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else if (act === "UPDATE") {
    try {
      const data = await prismaInstance[model_name][queryType]({
        where: where,
        data: data_body,
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }else if (act === "DELETE") {
    try {
      const data = await prismaInstance[model_name][queryType]({
        where: where,
      });
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

export const OPTIONS = () => NextResponse.json({});
