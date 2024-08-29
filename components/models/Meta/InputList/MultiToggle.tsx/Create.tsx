import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { X } from 'lucide-react';
import { useState, useCallback } from 'react';

export const Create = ({ data, setData }: { data: any; setData: (data: any) => void }) => {
    const [optionInput, setOptionInput] = useState({ label: '', value: '' });
    const [options, setOptions] = useState<any[]>([]);
    const [authRoleInput, setAuthRoleInput] = useState('');
    const [authRoles, setAuthRoles] = useState<string[]>([]);

    const handleFieldChange = useCallback((field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            fieldCreate: {
                create: {
                    ...prev.fieldCreate?.create,
                    [field]: value
                }
            }
        }));
    }, [setData]);

    const handleAddItem = (inputValue: string, setInput: (value: string) => void, items: string[], setItems: (items: string[]) => void, fieldName: string) => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !items.includes(trimmedValue)) {
            const updatedItems = [...items, trimmedValue];
            setItems(updatedItems);
            setInput('');
            handleFieldChange(fieldName, updatedItems);
        }
    };

    const handleRemoveItem = (item: string, items: string[], setItems: (items: string[]) => void, fieldName: string) => {
        const updatedItems = items.filter((i) => i !== item);
        setItems(updatedItems);
        handleFieldChange(fieldName, updatedItems);
    };

    const handleOptionChange = (field: keyof typeof optionInput, value: string) => {
        setOptionInput((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddOption = () => {
        if (optionInput.label && optionInput.value) {
            const updatedOptions = [...options, optionInput];
            setOptions(updatedOptions);
            handleFieldChange('defaultValue', JSON.stringify(updatedOptions));
            setOptionInput({ label: '', value: '' });
        }
    };

    const removeOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        handleFieldChange('defaultValue', JSON.stringify(updatedOptions));
    };

    return (
        <div className="border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Field Create Actions</h1>
            <div className="space-y-4">
                {['isUI', 'isRequired', 'isAuth', 'isUnique'].map((field) => (
                    <div key={field} className="flex items-center justify-between">
                        <Label>{field}</Label>
                        <Switch
                            checked={data?.fieldCreate?.create?.[field]}
                            onCheckedChange={(checked) => handleFieldChange(field, checked)}
                        />
                    </div>
                ))}
                <div>
                    <Label>Default Options</Label>
                    <div className="border p-3 mt-3 space-y-2">
                        <Label>Label</Label>
                        <Input
                            value={optionInput.label}
                            onChange={(e) => {
                                handleOptionChange('label', e.target.value)
                                handleOptionChange('value', e.target.value)
                            }}
                        />
                        <Label>Value</Label>
                        <Button onClick={handleAddOption}>Add</Button>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <ToggleGroup type="multiple">
                                    <ToggleGroupItem value={option.value}>
                                        {option.label}
                                        <X
                                    onClick={() => removeOption(index)}
                                    className="w-4 h-4 ml-2 border rounded-full border-red-500 cursor-pointer"
                                />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                                
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Label>Auth Roles</Label>
                    <div className="flex space-x-2">
                        <Input
                            value={authRoleInput}
                            onChange={(e) => setAuthRoleInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={() => handleAddItem(authRoleInput, setAuthRoleInput, authRoles, setAuthRoles, 'authRoles')}>
                            Add
                        </Button>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {authRoles.map((role, index) => (
                            <Badge key={index}>
                                {role}
                                <X
                                    onClick={() => handleRemoveItem(role, authRoles, setAuthRoles, 'authRoles')}
                                    className="w-4 h-4 ml-2 border rounded-full"
                                />
                            </Badge>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
