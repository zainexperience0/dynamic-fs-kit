import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Create } from '../Actions/Create';
import { Update } from '../Actions/Update';
import { Delete } from '../Actions/Delete';
import { Find } from '../Actions/Find';

export const TextAreaInput = ({ data, setData }: any) => {
    return (
        <div className="p-4 space-y-6">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Meta</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 mt-2 p-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={data?.name}
                                    onChange={(e) => setData((prev: any) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Is Searchable</Label>
                                <Switch
                                    checked={data?.isSearchable}
                                    onCheckedChange={(e) => setData(
                                        (prev: any) => ({
                                            ...prev,
                                            isSearchable: e
                                        })
                                    )}
                                    className="ml-2"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Is Sortable</Label>
                                <Switch
                                    checked={data?.isSortable}
                                    onCheckedChange={(e) => setData(
                                        (prev: any) => ({
                                            ...prev,
                                            isSortable: e
                                        })
                                    )}
                                    className="ml-2"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Create Operations</AccordionTrigger>
                    <AccordionContent>
                        <Create data={data} setData={setData} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Update Operations</AccordionTrigger>
                    <AccordionContent>
                        <Update data={data} setData={setData} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Delete Operations</AccordionTrigger>
                    <AccordionContent>
                        <Delete data={data} setData={setData} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Find Operations</AccordionTrigger>
                    <AccordionContent>
                        <Find data={data} setData={setData} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
