import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';

export const SelectInput = ({ data, setData }: any) => {
    const [options, setOptions] = useState<any[]>([
        { value: '', label: '' }
    ]);

    const handleOptionChange = (index: number, key: string, value: string) => {
        const newOptions = [...options];
        newOptions[index] = { ...newOptions[index], [key]: value };
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, { value: '', label: '' }]);
        setData({
            ...data,
            fields: {
                create: {
                    value: JSON.stringify(options),
                },
            },
        });
    };

    const removeOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

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

                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div>
                            <Label>
                                Option Label
                            </Label>
                            <Input
                                value={option.label}
                                onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                                placeholder="Enter option label"
                            />
                        </div>
                        <div>
                            <Label>
                                Option Value
                            </Label>
                            <Input
                                value={option.value}
                                onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                                placeholder="Enter option value"
                            />
                        </div>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => removeOption(index)}
                            className="text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                <Button
                    variant="secondary"
                    onClick={addOption}
                >
                    Add Option
                </Button>

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
