import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const MultiToggleInput = ({ data, setData }: any) => {
    const [options, setOptions] = useState<any[]>([]);

    console.log(options);

    return (
        <div className="mx-auto">
            <div className="space-y-6 border rounded-lg p-6">
                <div>
                    <Label>
                        Name
                    </Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value,
                        })}
                    />
                </div>
                <div className='border p-3'>
                    <div>
                        <Input
                            value={data.label}
                            onChange={(e: any) => {
                                setOptions(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="secondary"
                    >
                        Add Option
                    </Button>
                </div>


                <div className="flex items-center justify-between mt-4">
                    <Label>
                        Is Searchable
                    </Label>
                    <Switch
                        checked={data.isSearchable}
                        onCheckedChange={(e) => setData({
                            ...data,
                            isSearchable: e,
                        })}
                        className="ml-2"
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Label>
                        Is Sortable
                    </Label>
                    <Switch
                        checked={data.isSortable}
                        onCheckedChange={(e) => setData({
                            ...data,
                            isSortable: e,
                        })}
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );
};
