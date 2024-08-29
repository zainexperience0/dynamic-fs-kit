import { prismaInstance } from "@/lib/prismaInit";
import { NextRequest, NextResponse } from "next/server";

// POST
// baseurl/api/v1/dynamic/model_name      create a record or handle other operations
export async function POST(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const data_0 = await req.json();
  const { act, queryType, select, where, data_body } = data_0;

  try {
    let data;

    // GET Requests
    if (act === "GET") {
      if (queryType === "findUnique") {
        data = await prismaInstance[model_name][queryType]({
          where,
          select,
        });
      } else {
        data = await prismaInstance[model_name][queryType]();
      }
    }

    // POST Requests
    if (act === "POST") {
      console.log(JSON.stringify(data_body));

      data = await prismaInstance[model_name][queryType]({
        data: data_body,
      });
    }

    // UPDATE Requests
    if (act === "UPDATE") {
      data = await prismaInstance[model_name][queryType]({
        where,
        data: data_body, // Correctly pass the data and where clause for the update
      });
    }

    // DELETE Requests
    if (act === "DELETE") {
      data = await prismaInstance[model_name][queryType]({
        where,
      });
    }

    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(JSON.stringify(error));

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const OPTIONS = () => NextResponse.json({});
