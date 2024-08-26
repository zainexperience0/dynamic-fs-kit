"use client";
import { CommentBox } from "@/components/models/CommentBox";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ListModelData } from "@/components/models/listModelData";
import { ViewField } from "@/components/models/viewField";

// export function generateMetadata({ params }: any): any {
//   const dynamicParamaters = params.fields;
//   const model = dynamicParamaters[0];
//   return {
//     title: model.toUpperCase(),
//   };
// }

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParamaters = params.fields;
  // console.log({dynamicParamaters});
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];

  const deletefieldKey = searchParams?.deletekey;

  if (fieldId && !["edit", "delete"].includes(action)) {
    return <ViewField modelSlug={model} id={fieldId} />;
  } else if (action) {
    return (
      <div>
        {action === "create" && <CreateField model={model} page={true} />}
        {action === "edit" && <EditField model={model} id={fieldId} />}
        {action === "delete" && (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        )}
      </div>
    );
  } else if (model) {
    return (
      <div>
        <ListModelData modelSlug={model} page={true} />
      </div>
    );
  }
};

export default DynamicPage;